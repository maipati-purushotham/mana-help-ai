
import { NextRequest, NextResponse } from "next/server";
import { geminiModel } from "@/lib/gemini";
import { AskResponseSchema } from "@/lib/schemas";
import {
    ASK_SYSTEM_PROMPT_TE,
    ASK_SYSTEM_PROMPT_EN,
} from "@/lib/prompts";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const question = body?.question;
        const language = (body?.language as string) || "te";
        const history = Array.isArray(body?.history) ? body.history : [];

        if (typeof question !== "string" || !question.trim()) {
            return NextResponse.json({ error: "Empty question" }, { status: 400 });
        }
        if (question.length > 2000) {
            return NextResponse.json(
                { error: "Question too long (max 2000 chars)" },
                { status: 413 }
            );
        }

        const systemPrompt =
            language === "te" ? ASK_SYSTEM_PROMPT_TE : ASK_SYSTEM_PROMPT_EN;

        
        let contextText = "";
        if (history.length > 0) {
            const contextLines = history
                .map(
                    (h: any) =>
                        `User: ${h.question}\nAssistant: ${h.answer}`
                )
                .join("\n\n");
            contextText = `Previous conversation:\n${contextLines}\n\n`;
        }

        const userPrompt = `${contextText}User's new question: ${question}`;

        const result = await geminiModel.generateContent([
            { text: systemPrompt },
            { text: userPrompt },
        ]);

        const rawText = result.response.text();
        let parsed: unknown;
        try {
            parsed = JSON.parse(rawText);
        } catch {
            console.error("[ask] JSON parse failed:", rawText.slice(0, 300));
            return NextResponse.json(
                { error: "AI returned invalid format." },
                { status: 502 }
            );
        }

        const validated = AskResponseSchema.safeParse(parsed);
        if (!validated.success) {
            console.error("[ask] Schema validation failed:", validated.error.issues);
            return NextResponse.json(
                { error: "AI response did not match format." },
                { status: 502 }
            );
        }

        return NextResponse.json(validated.data);
    } catch (err: any) {
        const errMsg = err?.message || String(err);
        console.error("[ask] Error:", errMsg);

        if (errMsg.includes("403") || errMsg.includes("denied access")) {
            return NextResponse.json(
                { error: "AI service access denied. Check your API key." },
                { status: 403 }
            );
        }
        if (errMsg.includes("API key not valid")) {
            return NextResponse.json(
                { error: "Invalid API key." },
                { status: 401 }
            );
        }
        if (errMsg.includes("429") || err?.status === 429) {
            return NextResponse.json(
                { error: "Too many requests. Please wait." },
                { status: 429 }
            );
        }

        return NextResponse.json(
            { error: "Something went wrong. Please try again." },
            { status: 500 }
        );
    }
}