
"use client";

import { useState } from "react";
import type { AskResponse } from "@/lib/schemas";
import type { Lang } from "@/lib/i18n";
import { LuVolume2, LuSquare, LuTriangleAlert, LuSprout } from "react-icons/lu";

type Props = {
  data: AskResponse;
  lang: Lang;
  question?: string;
};

export default function AnswerCard({ data, lang, question }: Props) {
  const [speaking, setSpeaking] = useState(false);

  const handleSpeak = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(data.answer);
    u.lang = lang === "te" ? "te-IN" : "en-IN";
    u.rate = 0.9;
    const voices = window.speechSynthesis.getVoices();
    const match = voices.find((v) =>
      v.lang.toLowerCase().startsWith(lang === "te" ? "te" : "en")
    );
    if (match) u.voice = match;
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(u);
    setSpeaking(true);
  };

  return (
    <div className="flex flex-col gap-3">
      {question && (
        <div className="flex justify-end">
          <div className="max-w-[85%] bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-3xl rounded-br-md px-5 py-3 shadow-md">
            <p className="text-xs font-bold text-emerald-100 uppercase tracking-wide mb-1">
              {lang === "te" ? "మీరు" : "You"}
            </p>
            <p className="text-base leading-relaxed">{question}</p>
          </div>
        </div>
      )}

      <div className="flex justify-start">
        <div className="max-w-[90%] bg-white border border-emerald-100 rounded-3xl rounded-bl-md px-5 py-4 shadow-lg shadow-emerald-100/50 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
              <LuSprout className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <p className="text-xs font-bold text-emerald-700 uppercase tracking-wide">
              {lang === "te" ? "మన హెల్ప్ AI" : "Mana Help AI"}
            </p>
          </div>

          <p className="text-base sm:text-lg leading-relaxed text-emerald-950 whitespace-pre-wrap">
            {data.answer}
          </p>

          {data.verificationNote && (
            <div className="bg-amber-50 border-l-4 border-amber-400 p-3 rounded-lg flex gap-2">
              <LuTriangleAlert className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-amber-800 uppercase tracking-wide mb-1">
                  {lang === "te" ? "ధృవీకరించండి" : "Verify"}
                </p>
                <p className="text-sm text-amber-900">
                  {data.verificationNote}
                </p>
              </div>
            </div>
          )}

          <button
            onClick={handleSpeak}
            className="self-start inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-full text-sm font-bold transition"
          >
            {speaking ? (
              <>
                <LuSquare className="w-4 h-4" />
                <span>{lang === "te" ? "ఆపండి" : "Stop"}</span>
              </>
            ) : (
              <>
                <LuVolume2 className="w-4 h-4" />
                <span>{lang === "te" ? "వినండి" : "Listen"}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}