
"use client";

import { useState, useRef, useEffect } from "react";
import { strings, type Lang } from "@/lib/i18n";
import type { AskResponse } from "@/lib/schemas";
import { LuMessageCircle, LuRocket, LuLoader, LuTriangleAlert } from "react-icons/lu";
import AnswerCard from "./AnswerCard";

type Props = {
  lang: Lang;
};

type Message = {
  id: string;
  question: string;
  answer: AskResponse;
};

export default function TextQuestion({ lang }: Props) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const t = strings[lang];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSubmit = async () => {
    if (!text.trim() || loading) return;
    const question = text.trim();
    setText("");
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
          question,
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
        { id: `${Date.now()}-${Math.random()}`, question, answer: data },
      ]);
    } catch (err: any) {
      console.error("Ask failed:", err);
      setError(err?.message || t.networkError);
      setText(question);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([]);
    setError(null);
    setText("");
  };

  return (
    <div className="flex flex-col gap-4 w-full">
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

      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-md flex flex-col gap-3">
        <label
          htmlFor="question"
          className="text-base font-bold text-emerald-800 flex items-center gap-2"
        >
          <LuMessageCircle className="w-4 h-4" />
          {messages.length === 0
            ? t.typeQuestion
            : lang === "te"
            ? "మరింత అడగండి..."
            : "Ask follow-up..."}
        </label>
        <textarea
          id="question"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          placeholder={t.typePlaceholder}
          rows={2}
          disabled={loading}
          className="w-full border-2 border-emerald-100 rounded-xl p-3
                     text-base text-emerald-950 bg-amber-50/50
                     focus:border-emerald-500 focus:outline-none
                     focus:ring-2 focus:ring-emerald-100
                     disabled:opacity-50 transition resize-none"
        />
        <div className="flex gap-2">
          {messages.length > 0 && (
            <button
              onClick={handleClear}
              disabled={loading}
              className="px-4 min-h-[52px] border-2 border-slate-300
                         text-slate-700 rounded-xl text-sm font-semibold
                         hover:bg-slate-50 disabled:opacity-50 transition"
            >
              {lang === "te" ? "క్లియర్" : "Clear"}
            </button>
          )}
          <button
            onClick={handleSubmit}
            disabled={!text.trim() || loading}
            className="flex-1 min-h-[52px] bg-gradient-to-r from-emerald-500 to-green-600
                       text-white rounded-xl text-base font-bold
                       disabled:opacity-40 hover:from-emerald-600 hover:to-green-700
                       transition flex items-center justify-center gap-2
                       shadow-lg shadow-emerald-200/60"
          >
            {loading ? (
              <>
                <LuLoader className="w-4 h-4 animate-spin" />
                {lang === "te" ? "ఆలోచిస్తున్నాను..." : "Thinking..."}
              </>
            ) : (
              <>
                <LuRocket className="w-4 h-4" />
                {t.submit}
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex gap-3 animate-fade-in">
          <LuTriangleAlert className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-800 flex-1">{error}</p>
        </div>
      )}
    </div>
  );
}