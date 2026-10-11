
"use client";

import { useState, useRef, useEffect } from "react";
import { strings, type Lang } from "@/lib/i18n";
import type { DocumentAnalysis } from "@/lib/schemas";
import {
    LuFileText,
    LuX,
    LuSearch,
    LuLoader,
    LuTriangleAlert,
    LuLock,
} from "react-icons/lu";
import ExplanationCard from "./ExplanationCard";

type Props = {
    lang: Lang;
};

const MAX_MB = 5;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export default function DocumentUpload({ lang }: Props) {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [consent, setConsent] = useState<boolean>(false);
    const [showConsent, setShowConsent] = useState<boolean>(false);
    const [pendingFile, setPendingFile] = useState<File | null>(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState<DocumentAnalysis | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const t = strings[lang];

    useEffect(() => {
        if (typeof window === "undefined") return;
        if (localStorage.getItem("mana_help_consent") === "yes") setConsent(true);
    }, []);

    const validateAndSet = (f: File) => {
        setError(null);
        setResult(null);
        if (!ALLOWED_TYPES.includes(f.type)) {
            setError(t.fileTypeError);
            return;
        }
        if (f.size > MAX_MB * 1024 * 1024) {
            setError(t.fileSizeError);
            return;
        }
        if (preview) URL.revokeObjectURL(preview);
        setFile(f);
        setPreview(URL.createObjectURL(f));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if (!f) return;
        if (!ALLOWED_TYPES.includes(f.type)) {
            setError(t.fileTypeError);
            return;
        }
        if (f.size > MAX_MB * 1024 * 1024) {
            setError(t.fileSizeError);
            return;
        }
        if (!consent) {
            setPendingFile(f);
            setShowConsent(true);
            return;
        }
        validateAndSet(f);
    };

    const acceptConsent = () => {
        localStorage.setItem("mana_help_consent", "yes");
        setConsent(true);
        setShowConsent(false);
        if (pendingFile) {
            validateAndSet(pendingFile);
            setPendingFile(null);
        }
    };

    const declineConsent = () => {
        setShowConsent(false);
        setPendingFile(null);
        if (inputRef.current) inputRef.current.value = "";
    };

    const handleRemove = () => {
        if (preview) URL.revokeObjectURL(preview);
        setFile(null);
        setPreview(null);
        setError(null);
        setResult(null);
        if (inputRef.current) inputRef.current.value = "";
    };

    const handleAnalyze = async () => {
        if (!file || analyzing) return;
        setAnalyzing(true);
        setError(null);
        setResult(null);

        try {
            const fd = new FormData();
            fd.append("image", file);
            fd.append("language", lang);

            const res = await fetch("/api/analyze-document", {
                method: "POST",
                body: fd,
            });

            if (!res.ok) {
                const errBody = await res.json().catch(() => ({}));
                throw new Error(errBody.error || `Request failed (${res.status})`);
            }

            const data = (await res.json()) as DocumentAnalysis;
            setResult(data);
        } catch (err: any) {
            console.error("Analyze failed:", err);
            setError(err?.message || t.networkError);
        } finally {
            setAnalyzing(false);
        }
    };

    return (
        <div className="w-full flex flex-col gap-4">
            {}
            {showConsent && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-white rounded-3xl p-6 max-w-md w-full flex flex-col gap-4 shadow-2xl">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center self-center">
                            <LuLock className="w-7 h-7 text-white" strokeWidth={2.5} />
                        </div>
                        <h2 className="text-xl font-bold text-emerald-950 text-center">
                            {lang === "te" ? "ముఖ్యమైన సమాచారం" : "Important"}
                        </h2>
                        <p className="text-base text-emerald-900/80 leading-relaxed text-center">
                            {lang === "te"
                                ? "మీ ఫోటో AI సేవకు (Google Gemini) పంపబడుతుంది. మేము దానిని మా సర్వర్‌లో సేవ్ చేయము. కొనసాగించాలా?"
                                : "Your photo will be sent to an AI service (Google Gemini). We do NOT save it on our servers. Continue?"}
                        </p>
                        <div className="flex gap-2 mt-2">
                            <button
                                onClick={declineConsent}
                                className="flex-1 min-h-[52px] border-2 border-slate-300 text-slate-700 rounded-xl text-base font-semibold hover:bg-slate-50 transition"
                            >
                                {lang === "te" ? "వద్దు" : "No"}
                            </button>
                            <button
                                onClick={acceptConsent}
                                className="flex-1 min-h-[52px] bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl text-base font-semibold hover:from-emerald-600 hover:to-green-700 shadow-lg shadow-emerald-200/50 transition"
                            >
                                {lang === "te" ? "అవును" : "Yes"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {!file && !result && (
                <button
                    onClick={() => inputRef.current?.click()}
                    aria-label={t.uploadDocument}
                    className="w-full min-h-[88px] bg-gradient-to-br from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-3xl flex items-center justify-center gap-3 shadow-xl shadow-emerald-200/60 transition active:scale-[0.98]"
                >
                    <LuFileText className="w-8 h-8" strokeWidth={2.2} />
                    <span className="text-lg font-bold">{t.uploadDocument}</span>
                </button>
            )}

            <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                capture="environment"
                onChange={handleFileChange}
                className="hidden"
            />

            {preview && file && !result && (
                <div className="flex flex-col gap-3 animate-fade-in">
                    <div className="relative bg-white rounded-3xl p-3 border border-emerald-100 shadow-lg">
                        {}
                        <img
                            src={preview}
                            alt="Document preview"
                            className="w-full max-h-96 object-contain rounded-2xl bg-amber-50/50"
                        />
                        <button
                            onClick={handleRemove}
                            aria-label={t.remove}
                            className="absolute top-5 right-5 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-700 transition active:scale-95"
                        >
                            <LuX className="w-5 h-5" strokeWidth={2.5} />
                        </button>
                    </div>

                    <p className="text-xs text-emerald-700 text-center bg-white/60 backdrop-blur rounded-full px-4 py-2 self-center font-semibold">
                        📎 {file.name} • {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>

                    <div className="flex gap-2">
                        <button
                            onClick={handleRemove}
                            disabled={analyzing}
                            className="flex-1 min-h-[56px] border-2 border-slate-300 text-slate-700 rounded-xl text-base font-semibold hover:bg-slate-50 disabled:opacity-50 transition"
                        >
                            {t.remove}
                        </button>
                        <button
                            onClick={handleAnalyze}
                            disabled={analyzing}
                            className="flex-1 min-h-[56px] bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl text-base font-semibold hover:from-emerald-600 hover:to-green-700 disabled:opacity-60 flex items-center justify-center gap-2 shadow-lg shadow-emerald-200/60 transition"
                        >
                            {analyzing ? (
                                <>
                                    <LuLoader className="w-5 h-5 animate-spin" />
                                    {t.analyzing}
                                </>
                            ) : (
                                <>
                                    <LuSearch className="w-5 h-5" strokeWidth={2.5} />
                                    {t.analyze}
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}

            {result && (
                <div className="flex flex-col gap-3 animate-fade-in">
                    <ExplanationCard data={result} lang={lang} />
                    <button
                        onClick={handleRemove}
                        className="w-full min-h-[56px] border-2 border-slate-300 text-slate-700 rounded-xl text-base font-semibold hover:bg-slate-50 transition"
                    >
                        {lang === "te" ? "కొత్త పేపర్" : "New document"}
                    </button>
                </div>
            )}

            {error && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex flex-col gap-2 animate-fade-in">
                    <div className="flex gap-3">
                        <LuTriangleAlert className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-red-800 flex-1">{error}</p>
                    </div>
                    {file && (
                        <button
                            onClick={handleAnalyze}
                            className="self-start text-sm font-bold text-red-700 underline"
                        >
                            {t.retry}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}