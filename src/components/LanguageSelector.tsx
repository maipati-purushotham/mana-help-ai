
"use client";

import type { Lang } from "@/lib/i18n";

type Props = {
    value: Lang;
    onChange: (lang: Lang) => void;
};

export default function LanguageSelector({ value, onChange }: Props) {
    return (
        <div
            className="flex gap-1 bg-white/80 backdrop-blur border border-emerald-200 rounded-full p-1 shadow-sm"
            role="group"
            aria-label="Language selection"
        >
            <button
                onClick={() => onChange("te")}
                aria-pressed={value === "te"}
                className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${value === "te"
                        ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-md"
                        : "text-emerald-700 hover:bg-emerald-50"
                    }`}
            >
                తెలుగు
            </button>
            <button
                onClick={() => onChange("en")}
                aria-pressed={value === "en"}
                className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${value === "en"
                        ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-md"
                        : "text-emerald-700 hover:bg-emerald-50"
                    }`}
            >
                EN
            </button>
        </div>
    );
}