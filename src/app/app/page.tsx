
"use client";

import { useState } from "react";
import { strings, type Lang } from "@/lib/i18n";
import LanguageSelector from "@/components/LanguageSelector";
import MicButton from "@/components/MicButton";
import DocumentUpload from "@/components/DocumentUpload";
import TextQuestion from "@/components/TextQuestion";
import {
  LuMic,
  LuFileText,
  LuMessageCircle,
  LuArrowRight,
  LuArrowLeft,
  LuShieldCheck,
  LuSprout,
} from "react-icons/lu";

type ToolKey = "voice" | "document" | "text" | null;

export default function AppPage() {
  const [lang, setLang] = useState<Lang>("te");
  const [selected, setSelected] = useState<ToolKey>(null);
  const t = strings[lang];

  const tools = [
    {
      key: "voice" as const,
      Icon: LuMic,
      title: lang === "te" ? "మాట్లాడండి" : "Speak",
      subtitle: lang === "te" ? "వాయిస్ ద్వారా ప్రశ్న" : "Ask by voice",
      desc:
        lang === "te"
          ? "మైక్రోఫోన్ నొక్కి తెలుగులో మాట్లాడండి"
          : "Tap the mic and ask in Telugu",
      gradient: "from-emerald-500 to-green-600",
      bg: "from-emerald-50 to-green-50",
      border: "border-emerald-200",
      hover: "hover:border-emerald-400",
    },
    {
      key: "document" as const,
      Icon: LuFileText,
      title: lang === "te" ? "పేపర్ పంపండి" : "Upload Paper",
      subtitle: lang === "te" ? "ఫోటో తీసి పంపండి" : "Snap a document",
      desc:
        lang === "te"
          ? "పేపర్ ఫోటో తీసి అప్‌లోడ్ చేయండి"
          : "Take a photo and upload it",
      gradient: "from-amber-500 to-orange-600",
      bg: "from-amber-50 to-orange-50",
      border: "border-amber-200",
      hover: "hover:border-amber-400",
    },
    {
      key: "text" as const,
      Icon: LuMessageCircle,
      title: lang === "te" ? "టైప్ చేయండి" : "Type",
      subtitle: lang === "te" ? "ప్రశ్న టైప్ చేయండి" : "Type your question",
      desc:
        lang === "te"
          ? "కీబోర్డ్ ద్వారా ప్రశ్న అడగండి"
          : "Ask by typing your question",
      gradient: "from-sky-500 to-blue-600",
      bg: "from-sky-50 to-blue-50",
      border: "border-sky-200",
      hover: "hover:border-sky-400",
    },
  ];

  const activeTool = tools.find((x) => x.key === selected);

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-6 bg-amber-50">
      <div className="w-full max-w-md flex flex-col gap-6">
        {}
        <header className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-24 h-24">
              <img
                src="/Website-Logo.png"
                alt="Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-emerald-950 leading-tight">
                {t.appName}
              </h1>
              <p className="text-xs text-emerald-700 font-medium">
                {lang === "te"
                  ? "మీ డిజిటల్ సహాయకుడు"
                  : "Your digital helper"}
              </p>
            </div>
          </div>
          <LanguageSelector value={lang} onChange={setLang} />
        </header>

        {}
        <div className="bg-gradient-to-br from-emerald-50 to-amber-50 border border-emerald-200 rounded-3xl p-5 shadow-sm">
          <p className="text-base leading-relaxed text-emerald-900 text-center">
            {t.welcome}
          </p>
        </div>

        {}
        {!selected && (
          <div className="flex flex-col gap-3 animate-fade-in">
            <p className="text-xs font-bold text-emerald-700 uppercase tracking-widest text-center">
              {lang === "te" ? "ఏది ఎంచుకోండి" : "Choose one option"}
            </p>

            {tools.map((tool) => (
              <button
                key={tool.key}
                onClick={() => setSelected(tool.key)}
                className={`group text-left bg-gradient-to-br ${tool.bg} ${tool.border} ${tool.hover} border-2 rounded-3xl p-5 hover:shadow-xl hover:-translate-y-1 transition-all`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform`}
                  >
                    <tool.Icon
                      className="w-8 h-8 text-white"
                      strokeWidth={2.2}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-lg font-bold text-emerald-950">
                      {tool.title}
                    </p>
                    <p className="text-xs font-semibold text-emerald-700 mb-1">
                      {tool.subtitle}
                    </p>
                    <p className="text-sm text-emerald-900/70">{tool.desc}</p>
                  </div>
                  <LuArrowRight
                    className="w-5 h-5 text-emerald-700 group-hover:translate-x-1 transition-transform"
                    strokeWidth={2.5}
                  />
                </div>
              </button>
            ))}

            {}
            <div className="mt-2 bg-white border border-emerald-200 rounded-2xl p-4 flex gap-3">
              <LuShieldCheck
                className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5"
                strokeWidth={2.2}
              />
              <p className="text-xs text-emerald-900/70 leading-relaxed">
                {t.privacyNote}
              </p>
            </div>
          </div>
        )}

        {}
        {selected && activeTool && (
          <div className="flex flex-col gap-4 animate-fade-in">
            {}
            <button
              onClick={() => setSelected(null)}
              className="self-start inline-flex items-center gap-2 px-4 py-2 bg-white border border-emerald-200 rounded-full text-sm font-bold text-emerald-700 hover:bg-emerald-50 hover:border-emerald-400 transition group"
            >
              <LuArrowLeft
                className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform"
                strokeWidth={2.5}
              />
              {lang === "te" ? "వెనక్కి" : "Back"}
            </button>

            {}
            <div className="bg-gradient-to-br from-emerald-50 to-amber-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${activeTool.gradient} flex items-center justify-center shadow-md`}
              >
                <activeTool.Icon
                  className="w-6 h-6 text-white"
                  strokeWidth={2.2}
                />
              </div>
              <div>
                <p className="text-base font-bold text-emerald-950">
                  {activeTool.title}
                </p>
                <p className="text-xs text-emerald-700">
                  {activeTool.subtitle}
                </p>
              </div>
            </div>

            {}
            {selected === "voice" && <MicButton lang={lang} />}
            {selected === "document" && <DocumentUpload lang={lang} />}
            {selected === "text" && <TextQuestion lang={lang} />}
          </div>
        )}

        {}
        <footer className="mt-4 pb-6 text-center flex flex-col items-center gap-2">
          <div className="inline-flex items-center gap-1.5 text-xs text-emerald-700/60">
            <LuSprout className="w-3.5 h-3.5" strokeWidth={2.5} />
            <span>Mana Help AI</span>
          </div>
          <p className="text-xs text-emerald-700/60">
            {lang === "te"
              ? "గమనిక: ఇది సమాచార సహాయం మాత్రమే. అధికారిక నిర్ణయం కాదు."
              : "Note: Informational help only. Not an official decision."}
          </p>
        </footer>
      </div>
    </main>
  );
}