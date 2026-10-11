
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How it Works",
  description: "Learn how Mana Help AI explains documents in simple Telugu.",
};

const steps = [
  {
    num: "01",
    icon: "🎤",
    title: "Speak or Upload",
    titleTe: "మాట్లాడండి లేదా అప్‌లోడ్ చేయండి",
    desc: "Tap the mic and ask a question in Telugu, or take a photo of any document.",
  },
  {
    num: "02",
    icon: "🤖",
    title: "AI Understands",
    titleTe: "AI అర్థం చేసుకుంటుంది",
    desc: "Our AI reads your document or question and identifies what matters.",
  },
  {
    num: "03",
    icon: "📖",
    title: "Simple Explanation",
    titleTe: "సులభ వివరణ",
    desc: "Get a clear explanation in simple Telugu — no difficult words.",
  },
  {
    num: "04",
    icon: "🔊",
    title: "Listen Aloud",
    titleTe: "వినండి",
    desc: "Hear the explanation read out. Perfect for people who cannot read comfortably.",
  },
  {
    num: "05",
    icon: "✅",
    title: "Know Next Steps",
    titleTe: "తదుపరి చర్యలు",
    desc: "See actionable steps. Which office to visit. What documents to carry.",
  },
  {
    num: "06",
    icon: "🏛️",
    title: "Verify with Authority",
    titleTe: "అధికారిక ధృవీకరణ",
    desc: "For important decisions, we point you to the correct official source.",
  },
];

export default function HowItWorksPage() {
  return (
    <main className="bg-amber-50">
      {}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-emerald-50 py-16 sm:py-24">
        {}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block text-xs font-bold text-emerald-700 bg-white px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 shadow-sm">
            How it Works
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-emerald-950 mb-6 leading-tight">
            Simple by{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              design
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-emerald-900/70 max-w-2xl mx-auto leading-relaxed">
            Six simple steps to understand any document — no training, no
            typing, no complexity.
          </p>
        </div>
      </section>

      {}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col gap-6">
            {steps.map((s) => (
              <div
                key={s.num}
                className="group bg-gradient-to-br from-white to-emerald-50/30 border border-emerald-100 rounded-3xl p-6 sm:p-7 flex flex-col sm:flex-row gap-5 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-100/50 hover:-translate-y-1 transition-all"
              >
                {}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-3xl shadow-lg shadow-emerald-200 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                      {s.icon}
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-amber-400 text-emerald-950 text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                      {s.num}
                    </div>
                  </div>
                </div>

                {}
                <div className="flex-1">
                  <p className="text-xs font-bold text-emerald-600 tracking-widest mb-1 uppercase">
                    Step {s.num}
                  </p>
                  <h3 className="text-xl font-bold text-emerald-950 mb-1">
                    {s.title}
                  </h3>
                  <p className="text-xs font-bold text-emerald-600 mb-3">
                    {s.titleTe}
                  </p>
                  <p className="text-base text-emerald-900/70 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
    </main>
  );
}