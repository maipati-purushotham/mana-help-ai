
import { z } from "zod";

export const DocumentAnalysisSchema = z.object({
    documentType: z.string().min(1).max(200),
    simpleSummary: z.string().min(1).max(2000),
    keyInformation: z.array(z.string().max(500)).max(20),
    dates: z
        .array(
            z.object({
                date: z.string().max(100),
                purpose: z.string().max(300),
                confidence: z.enum(["high", "medium", "low"]),
            })
        )
        .max(10),
    possibleActions: z.array(z.string().max(500)).max(10),
    uncertainties: z.array(z.string().max(500)).max(10),
    verificationGuidance: z.array(z.string().max(500)).max(10),
    language: z.enum(["te", "en"]),
});

export type DocumentAnalysis = z.infer<typeof DocumentAnalysisSchema>;

export const AskResponseSchema = z.object({
    answer: z.string().min(1).max(4000),
    language: z.enum(["te", "en"]),
    verificationNote: z.string().max(500).optional().nullable(),
});

export type AskResponse = z.infer<typeof AskResponseSchema>;