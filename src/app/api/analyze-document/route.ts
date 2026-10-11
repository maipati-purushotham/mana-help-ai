
import { NextRequest, NextResponse } from "next/server";
import { geminiModel } from "@/lib/gemini";
import { DocumentAnalysisSchema } from "@/lib/schemas";
import { DOCUMENT_SYSTEM_PROMPT } from "@/lib/prompts";

const MAX_BYTES = 5 * 1024 * 1024; 
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("image");
        const language = (formData.get("language") as string) || "te";

        
        if (!(file instanceof File)) {
            return NextResponse.json(
                { error: "No image file provided" },
                { status: 400 }
            );
        }
        if (!ALLOWED_TYPES.includes(file.type)) {
            return NextResponse.json(
                { error: "Unsupported file type. Use JPG, PNG, or WEBP." },
                { status: 400 }
            );
        }
        if (file.size > MAX_BYTES) {
            return NextResponse.json(
                { error: "File too large. Max 5 MB." },
                { status: 413 }
            );
        }
        if (file.size === 0) {
            return NextResponse.json({ error: "Empty file" }, { status: 400 });
        }

        
        const arrayBuffer = await file.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString("base64");

        
        const userPrompt =
            language === "te"
                ? "ఈ డాక్యుమెంట్‌ను సులభమైన తెలుగులో వివరించండి. JSON మాత్రమే తిరిగి ఇవ్వండి."
                : "Explain this document in simple English. Return JSON only.";

        
        const result = await geminiModel.generateContent([
            { text: DOCUMENT_SYSTEM_PROMPT },
            { text: userPrompt },
            {
                inlineData: {
                    mimeType: file.type,
                    data: base64,
                },
            },
        ]);

        const rawText = result.response.text();
        console.log("[analyze-document] Raw AI response length:", rawText.length);

        
        let parsed: unknown;
        try {
            parsed = JSON.parse(rawText);
        } catch (parseErr) {
            console.error(
                "[analyze-document] JSON parse failed:",
                rawText.slice(0, 500)
            );
            return NextResponse.json(
                { error: "AI returned invalid format. Please try again." },
                { status: 502 }
            );
        }

        
        const validated = DocumentAnalysisSchema.safeParse(parsed);
        if (!validated.success) {
            console.error(
                "[analyze-document] Schema validation failed:",
                validated.error.issues
            );
            return NextResponse.json(
                { error: "AI response did not match expected format." },
                { status: 502 }
            );
        }

        return NextResponse.json(validated.data);
    } catch (err: any) {
        console.error("[analyze-document] Error:", err?.message || err);

        
        if (err?.message?.includes("429") || err?.status === 429) {
            return NextResponse.json(
                { error: "Too many requests. Please wait a moment and try again." },
                { status: 429 }
            );
        }

        return NextResponse.json(
            { error: "Something went wrong. Please try again." },
            { status: 500 }
        );
    }
}