
"use client";

import { useState, useRef, useEffect } from "react";
import { strings, type Lang } from "@/lib/i18n";
import type { AskResponse } from "@/lib/schemas";
import {
  LuMic,
  LuSquare,
  LuTriangleAlert,
  LuMessageCircle,
} from "react-icons/lu";
import AnswerCard from "./AnswerCard";

type Props = {
  lang: Lang;
};

type Message = {
  id: string;
  question: string;
  answer: AskResponse;
};

export default function MicButton({ lang }: Props) {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [supported, setSupported] = useState(true);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const recRef = useRef<any>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const t = strings[lang];

  useEffect(() => {
    if (typeof window === "undefined") return;
    const SR =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SR) setSupported(false);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const start = () => {
    setError(null);
    setTranscript("");

    const SR =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SR) {
      setError(t.micNotSupported);
      return;
    }

    const rec = new SR();
    rec.lang = lang === "te" ? "te-IN" : "en-IN";
    rec.interimResults = true;
    rec.continuous = false;

    rec.onresult = (e: any) => {
      let text = "";
      for (let i = 0; i < e.results.length; i++) {
        text += e.results[i][0].transcript;
      }
      setTranscript(text);
    };

    rec.onerror = (e: any) => {
      if (e.error === "not-allowed") {
        setError(
          lang === "te"
            ? "మైక్రోఫోన్ అనుమతి ఇవ్వండి."
            : "Please allow microphone permission."
        );
      } else if (e.error === "no-speech") {
        setError(
          lang === "te"
            ? "మాట వినిపించలేదు. మళ్ళీ ప్రయత్నించండి."
            : "No speech detected. Try again."
        );
      } else {
        setError(t.micNotSupported);
      }
      setListening(false);
    };

    rec.onend = () => setListening(false);

    try {
      rec.start();
      recRef.current = rec;
      setListening(true);
    } catch {
      setError(t.micNotSupported);
    }
  };

  const stop = () => {
    recRef.current?.stop();
    setListening(false);
  };

  const handleSubmit = async (questionText?: string) => {
    const q = (questionText || transcript).trim();
    if (!q || loading) return;
    setLoading(true);
    setError(null);

    try {
      const history = messages.map((m) => ({
        question: m.question,
        answer: m.answer.answer,
      }));

      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: q,
          language: lang,
          history: history.slice(-4),
        }),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.error || `Request failed (${res.status})`);
      }

      const data = (await res.json()) as AskResponse;
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-${Math.random()}`,
          question: q,
          answer: data,
        },
      ]);
      setTranscript("");
    } catch (err: any) {
      setError(err?.message || t.networkError);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([]);
    setError(null);
    setTranscript("");
  };

  if (!supported) {
    return (
      <div className="w-full bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3">
        <LuTriangleAlert className="w-6 h-6 text-amber-600 flex-shrink-0" />
        <p className="text-sm text-amber-900 leading-relaxed">
          {t.micNotSupported}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4">
      {messages.length > 0 && (
        <div className="bg-white/60 backdrop-blur rounded-3xl p-4 border border-emerald-100 max-h-[60vh] overflow-y-auto flex flex-col gap-5">
          {messages.map((m) => (
            <AnswerCard
              key={m.id}
              data={m.answer}
              lang={lang}
              question={m.question}
            />
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border border-emerald-100 rounded-3xl rounded-bl-md px-5 py-4 shadow-lg flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                  <LuMessageCircle
                    className="w-4 h-4 text-white"
                    strokeWidth={2.5}
                  />
                </div>
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" />
                  <span
                    className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.15s" }}
                  />
                  <span
                    className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.3s" }}
                  />
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      )}

      <div className="w-full bg-white/90 backdrop-blur border border-emerald-100 rounded-3xl p-6 shadow-lg shadow-emerald-100/50 flex flex-col items-center gap-4">
        <button
          onClick={listening ? stop : start}
          disabled={loading}
          aria-label={listening ? t.stopRecording : t.speakQuestion}
          className={`relative w-32 h-32 rounded-full text-white transition-all duration-300 flex items-center justify-center disabled:opacity-50 ${listening
              ? "bg-gradient-to-br from-red-500 to-red-700 mic-pulse scale-105"
              : "bg-gradient-to-br from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 active:scale-95 shadow-xl shadow-emerald-300/50"
            }`}
        >
          {listening ? (
            <LuSquare className="w-12 h-12" strokeWidth={2.2} />
          ) : (
            <LuMic className="w-12 h-12" strokeWidth={2.2} />
          )}
        </button>

        <div className="text-center">
          <p className="text-lg font-semibold text-emerald-900">
            {listening
              ? t.stopRecording
              : messages.length > 0
                ? lang === "te"
                  ? "మళ్ళీ అడగండి"
                  : "Ask again"
                : t.speakQuestion}
          </p>
          {listening && (
            <p className="text-sm text-red-600 mt-1 flex items-center gap-2 justify-center">
              <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
              {lang === "te" ? "వింటున్నాను..." : "Listening..."}
            </p>
          )}
        </div>
      </div>

      {transcript && !loading && (
        <div className="w-full bg-white border border-emerald-100 rounded-2xl p-4 shadow-md flex flex-col gap-3 animate-fade-in">
          <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wide">
            {lang === "te" ? "మీరు చెప్పింది" : "You said"}
          </p>
          <textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            rows={2}
            className="w-full border-2 border-emerald-200 rounded-xl p-3 text-base text-emerald-950 bg-amber-50/30 focus:border-emerald-500 focus:outline-none transition resize-none"
          />
          <div className="flex gap-2">
            <button
              onClick={() => {
                setTranscript("");
                setError(null);
              }}
              className="flex-1 min-h-[52px] border-2 border-slate-300 text-slate-700 rounded-xl text-base font-semibold hover:bg-slate-50 transition"
            >
              {lang === "te" ? "రద్దు" : "Cancel"}
            </button>
            <button
              onClick={() => handleSubmit()}
              className="flex-1 min-h-[52px] bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl text-base font-bold hover:from-emerald-600 hover:to-green-700 flex items-center justify-center gap-2 shadow-lg shadow-emerald-200/60 transition"
            >
              {t.submit}
            </button>
          </div>
        </div>
      )}

      {messages.length > 0 && !transcript && (
        <button
          onClick={handleClear}
          className="w-full min-h-[48px] border-2 border-emerald-200 text-emerald-700 rounded-xl text-sm font-semibold hover:bg-emerald-50 transition"
        >
          {lang === "te" ? "క్లియర్" : "Clear"}
        </button>
      )}

      {error && (
        <div className="w-full bg-red-50 border border-red-200 rounded-2xl p-4 flex gap-3">
          <LuTriangleAlert className="w-6 h-6 text-red-600 flex-shrink-0" />
          <p className="text-sm text-red-800 flex-1">{error}</p>
        </div>
      )}
    </div>
  );
}