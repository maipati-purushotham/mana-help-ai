
"use client";

import { useState, useRef } from "react";
import type { DocumentAnalysis } from "@/lib/schemas";
import type { Lang } from "@/lib/i18n";
import {
  LuBookOpen,
  LuKey,
  LuCalendar,
  LuCircleCheck,
  LuTriangleAlert,
  LuLandmark,
  LuVolume2,
  LuSquare,
  LuLoader,
  LuFileText,
} from "react-icons/lu";

type Props = {
  data: DocumentAnalysis;
  lang: Lang;
};

export default function ExplanationCard({ data, lang }: Props) {
  const [speaking, setSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleSpeak = async () => {
    if (speaking && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
      setSpeaking(false);
      return;
    }

    if (loading) return;
    setLoading(true);

    const fullText = [
      data.simpleSummary,
      data.keyInformation.join(". "),
      data.possibleActions.join(". "),
    ]
      .filter(Boolean)
      .join(". ");

    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: fullText, lang }),
      });

      if (!res.ok) throw new Error("TTS failed");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audioRef.current = audio;

      audio.onended = () => {
        setSpeaking(false);
        URL.revokeObjectURL(url);
        audioRef.current = null;
      };
      audio.onerror = () => {
        setSpeaking(false);
        URL.revokeObjectURL(url);
        audioRef.current = null;
      };

      await audio.play();
      setSpeaking(true);
    } catch (err) {
      console.error("TTS error:", err);
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(fullText);
        u.lang = lang === "te" ? "te-IN" : "en-IN";
        u.rate = 0.9;
        u.onend = () => setSpeaking(false);
        u.onerror = () => setSpeaking(false);
        window.speechSynthesis.speak(u);
        setSpeaking(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white border-2 border-emerald-200 rounded-3xl overflow-hidden shadow-xl shadow-emerald-100/50">
      {}
      <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-5 text-white">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-90 mb-1">
          <LuFileText className="w-4 h-4" />
          {lang === "te" ? "పేపర్ రకం" : "Document type"}
        </div>
        <h2 className="text-2xl font-bold">{data.documentType}</h2>
      </div>

      <div className="p-5 flex flex-col gap-5">
        {}
        <section>
          <h3 className="text-sm font-bold text-emerald-600 uppercase tracking-wide mb-2 flex items-center gap-2">
            <LuBookOpen className="w-4 h-4" strokeWidth={2.5} />
            {lang === "te" ? "సులభ వివరణ" : "Simple explanation"}
          </h3>
          <p className="text-lg leading-relaxed text-emerald-900/80">
            {data.simpleSummary}
          </p>
        </section>

        {}
        {data.keyInformation.length > 0 && (
          <section className="bg-amber-50/50 rounded-2xl p-4">
            <h3 className="text-sm font-bold text-emerald-600 uppercase tracking-wide mb-2 flex items-center gap-2">
              <LuKey className="w-4 h-4" strokeWidth={2.5} />
              {lang === "te" ? "ముఖ్య సమాచారం" : "Key information"}
            </h3>
            <ul className="flex flex-col gap-2">
              {data.keyInformation.map((k, i) => (
                <li key={i} className="text-base text-emerald-900/80 flex gap-2">
                  <span className="text-emerald-500 mt-0.5">•</span>
                  <span>{k}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {}
        {data.dates.length > 0 && (
          <section>
            <h3 className="text-sm font-bold text-emerald-600 uppercase tracking-wide mb-2 flex items-center gap-2">
              <LuCalendar className="w-4 h-4" strokeWidth={2.5} />
              {lang === "te" ? "ముఖ్య తేదీలు" : "Important dates"}
            </h3>
            <div className="flex flex-col gap-2">
              {data.dates.map((d, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-400 px-4 py-3 rounded-r-xl"
                >
                  <p className="text-lg font-bold text-amber-900">{d.date}</p>
                  <p className="text-sm text-amber-800">{d.purpose}</p>
                  <span
                    className={`inline-block mt-2 text-xs font-bold px-2 py-0.5 rounded-full ${d.confidence === "high"
                        ? "bg-emerald-100 text-emerald-700"
                        : d.confidence === "medium"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-700"
                      }`}
                  >
                    {d.confidence.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {}
        {data.possibleActions.length > 0 && (
          <section>
            <h3 className="text-sm font-bold text-emerald-600 uppercase tracking-wide mb-2 flex items-center gap-2">
              <LuCircleCheck className="w-4 h-4" strokeWidth={2.5} />
              {lang === "te" ? "తదుపరి చర్యలు" : "Next steps"}
            </h3>
            <ol className="flex flex-col gap-2">
              {data.possibleActions.map((a, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-base text-emerald-900/80 bg-emerald-50/50 rounded-xl p-3"
                >
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="flex-1">{a}</span>
                </li>
              ))}
            </ol>
          </section>
        )}

        {}
        {data.uncertainties.length > 0 && (
          <section className="bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-4">
            <h3 className="text-sm font-bold text-amber-900 uppercase tracking-wide mb-2 flex items-center gap-2">
              <LuTriangleAlert className="w-4 h-4" strokeWidth={2.5} />
              {lang === "te" ? "ఖచ్చితంగా తెలియనివి" : "Uncertain"}
            </h3>
            <ul className="flex flex-col gap-1.5">
              {data.uncertainties.map((u, i) => (
                <li key={i} className="text-sm text-amber-900 flex gap-2">
                  <span>•</span>
                  <span>{u}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {}
        {data.verificationGuidance.length > 0 && (
          <section className="bg-emerald-50 rounded-2xl p-4">
            <h3 className="text-sm font-bold text-emerald-800 uppercase tracking-wide mb-2 flex items-center gap-2">
              <LuLandmark className="w-4 h-4" strokeWidth={2.5} />
              {lang === "te" ? "ధృవీకరించండి" : "Verify with"}
            </h3>
            <ul className="flex flex-col gap-1.5">
              {data.verificationGuidance.map((v, i) => (
                <li key={i} className="text-sm text-emerald-800 flex gap-2">
                  <span>•</span>
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {}
        <button
          onClick={handleSpeak}
          disabled={loading}
          className="w-full min-h-[56px] bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl text-lg font-bold hover:from-emerald-600 hover:to-green-700 active:scale-95 disabled:opacity-50 transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-200/50"
        >
          {loading ? (
            <>
              <LuLoader className="w-5 h-5 animate-spin" />
              {lang === "te" ? "తయారు చేస్తున్నాను..." : "Generating..."}
            </>
          ) : speaking ? (
            <>
              <LuSquare className="w-5 h-5" />
              {lang === "te" ? "ఆపండి" : "Stop"}
            </>
          ) : (
            <>
              <LuVolume2 className="w-5 h-5" />
              {lang === "te" ? "వినండి" : "Listen"}
            </>
          )}
        </button>
      </div>
    </div>
  );
}