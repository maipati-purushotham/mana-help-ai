
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "About Mana Help AI — voice-first assistance for rural India.",
};

const values = [
  {
    icon: "🎤",
    title: "Voice First",
    titleTe: "వాయిస్ ముందుగా",
    desc: "Speak instead of type. Designed for people who find typing difficult.",
    color: "from-emerald-100 to-green-50",
  },
  {
    icon: "🧠",
    title: "Simple Language",
    titleTe: "సులభ భాష",
    desc: "Explain in short, familiar sentences. No technical jargon.",
    color: "from-amber-100 to-orange-50",
  },
  {
    icon: "🔒",
    title: "Privacy Focused",
    titleTe: "గోప్యత రక్షణ",
    desc: "We do not save your documents. Process and forget.",
    color: "from-sky-100 to-blue-50",
  },
  {
    icon: "⚖️",
    title: "Honest",
    titleTe: "నిజాయితీ",
    desc: "We say when we are uncertain. We never invent facts.",
    color: "from-rose-100 to-pink-50",
  },
  {
    icon: "🆓",
    title: "Free Forever",
    titleTe: "ఎప్పటికీ ఉచితం",
    desc: "No charges, no signup, no hidden fees.",
    color: "from-lime-100 to-green-50",
  },
  {
    icon: "🏛️",
    title: "Guided Verification",
    titleTe: "ధృవీకరణ మార్గదర్శనం",
    desc: "Point users to the right official source for final answers.",
    color: "from-violet-100 to-purple-50",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-amber-50">
      {}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-emerald-50 py-16 sm:py-24">
        {}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block text-xs font-bold text-emerald-700 bg-white px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 shadow-sm">
            About Us
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-emerald-950 mb-6 leading-tight">
            Making essential information{" "}
            <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 bg-clip-text text-transparent">
              accessible to everyone
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-emerald-900/70 max-w-2xl mx-auto leading-relaxed">
            Mana Help AI is a voice-first assistant built for people with
            limited literacy, especially in rural and semi-urban India.
          </p>
        </div>
      </section>

      {}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {}
            <div>
              <span className="inline-block text-xs font-bold text-emerald-700 bg-emerald-50 px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
                Our Mission
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-emerald-950 mb-6 leading-tight">
                Understand every{" "}
                <span className="text-emerald-600">document</span> in your
                language
              </h2>
              <p className="text-lg text-emerald-900/70 leading-relaxed mb-4">
                We believe essential digital information should be
                understandable to everyone — regardless of literacy level or
                technical experience.
              </p>
              <p className="text-lg text-emerald-900/70 leading-relaxed">
                Mana Help AI helps people understand what a document says, what
                it requires them to do, and how to verify the next step.
              </p>
            </div>

            {}
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-300/30 rounded-3xl blur-2xl" />
              <div className="relative bg-gradient-to-br from-emerald-600 via-green-600 to-emerald-700 rounded-3xl p-8 text-white shadow-2xl shadow-emerald-300/50">
                <p className="text-6xl mb-4">🎯</p>
                <p className="text-xl font-bold leading-relaxed">
                  "Speak in Telugu. Show your document. Understand what to do
                  next."
                </p>
                <p className="text-sm opacity-80 mt-4 font-semibold">
                  — Our core promise
                </p>
                {}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-amber-50 to-emerald-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold text-emerald-700 bg-white px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 shadow-sm">
              Our Values
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-950 mb-4">
              What we <span className="text-emerald-600">stand for</span>
            </h2>
            <p className="text-lg text-emerald-900/70 max-w-2xl mx-auto">
              Six principles that guide every decision we make.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className={`group bg-gradient-to-br ${v.color} rounded-3xl p-7 border border-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all`}
              >
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-3xl mb-5 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform">
                  {v.icon}
                </div>
                <h3 className="text-xl font-bold text-emerald-950 mb-1">
                  {v.title}
                </h3>
                <p className="text-sm font-bold text-emerald-600 mb-3">
                  {v.titleTe}
                </p>
                <p className="text-sm text-emerald-900/70 leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}