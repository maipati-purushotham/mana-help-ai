
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);


function pcmToWav(
    pcmData: Buffer,
    sampleRate = 24000,
    numChannels = 1,
    bitsPerSample = 16
): Buffer {
    const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
    const blockAlign = (numChannels * bitsPerSample) / 8;
    const dataSize = pcmData.length;
    const buffer = Buffer.alloc(44 + dataSize);

    buffer.write("RIFF", 0);
    buffer.writeUInt32LE(36 + dataSize, 4);
    buffer.write("WAVE", 8);
    buffer.write("fmt ", 12);
    buffer.writeUInt32LE(16, 16);
    buffer.writeUInt16LE(1, 20);
    buffer.writeUInt16LE(numChannels, 22);
    buffer.writeUInt32LE(sampleRate, 24);
    buffer.writeUInt32LE(byteRate, 28);
    buffer.writeUInt16LE(blockAlign, 32);
    buffer.writeUInt16LE(bitsPerSample, 34);
    buffer.write("data", 36);
    buffer.writeUInt32LE(dataSize, 40);
    pcmData.copy(buffer, 44);

    return buffer;
}

export async function POST(req: NextRequest) {
    try {
        const { text, lang = "te", voice } = await req.json();

        if (!text || typeof text !== "string") {
            return NextResponse.json({ error: "No text provided" }, { status: 400 });
        }


        const voiceName =
            voice ||
            (lang === "te" ? "te-IN-Chirp3-HD-Achernar" : "en-US-Chirp3-HD-Achernar");

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash-preview-tts",
        });

        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text }] }],
            generationConfig: {
                responseModalities: ["AUDIO"],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName },
                    },
                    languageCode: lang === "te" ? "te-IN" : "en-IN",
                },
            } as any,
        });

        const audioPart = result.response.candidates?.[0]?.content?.parts?.[0];
        if (!audioPart?.inlineData?.data) {
            return NextResponse.json({ error: "No audio generated" }, { status: 500 });
        }


        const pcmBuffer = Buffer.from(audioPart.inlineData.data, "base64");
        const wavBuffer = pcmToWav(pcmBuffer);

        return new NextResponse(new Uint8Array(wavBuffer), {
            headers: {
                "Content-Type": "audio/wav",
                "Cache-Control": "no-store",
            },
        });
    } catch (err: any) {
        console.error("[tts] Error:", err?.message || err);
        return NextResponse.json(
            { error: err?.message || "TTS failed" },
            { status: 500 }
        );
    }
}