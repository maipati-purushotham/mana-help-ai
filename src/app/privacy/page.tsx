
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Mana Help AI handles your data.",
};

const sections = [
  {
    id: "collect",
    num: "01",
    title: "What we collect",
    titleTe: "మేము ఏమి సేకరిస్తాము",
    body: "When you upload a document, we send the image to Google Gemini for analysis. We do not save the image on our servers. We do not require you to create an account.",
    icon: "📥",
    color: "emerald",
  },
  {
    id: "use",
    num: "02",
    title: "How we use your data",
    titleTe: "మీ డేటాను ఎలా ఉపయోగిస్తాము",
    body: "Your document or question is used only to generate an explanation. We do not use your data for advertising or profiling.",
    icon: "🎯",
    color: "amber",
  },
  {
    id: "third-party",
    num: "03",
    title: "Third-party AI service",
    titleTe: "మూడవ పక్ష AI సేవ",
    body: "Documents are processed by Google Gemini. Please review Google's privacy policy for details on how they handle API requests.",
    icon: "🤖",
    color: "sky",
  },
  {
    id: "retention",
    num: "04",
    title: "Data retention",
    titleTe: "డేటా నిల్వ",
    body: "We do not retain uploaded documents or questions after the response is generated. Feedback ratings may be stored anonymously to improve the service.",
    icon: "🗑️",
    color: "rose",
  },
  {
    id: "sensitive",
    num: "05",
    title: "Sensitive information",
    titleTe: "సున్నితమైన సమాచారం",
    body: "Please do not upload documents containing OTPs, passwords, PINs, or full bank account numbers. We strongly recommend redacting such information before upload.",
    icon: "🔐",
    color: "violet",
  },
  {
    id: "rights",
    num: "06",
    title: "Your rights",
    titleTe: "మీ హక్కులు",
    body: "Since we do not store your data, there is nothing to delete. If you have questions, contact us at hello@manahelpai.in.",
    icon: "⚖️",
    color: "lime",
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string; ring: string }> = {
  emerald: {
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    border: "border-emerald-300",
    ring: "ring-emerald-200",
  },
  amber: {
    bg: "bg-amber-100",
    text: "text-amber-700",
    border: "border-amber-300",
    ring: "ring-amber-200",
  },
  sky: {
    bg: "bg-sky-100",
    text: "text-sky-700",
    border: "border-sky-300",
    ring: "ring-sky-200",
  },
  rose: {
    bg: "bg-rose-100",
    text: "text-rose-700",
    border: "border-rose-300",
    ring: "ring-rose-200",
  },
  violet: {
    bg: "bg-violet-100",
    text: "text-violet-700",
    border: "border-violet-300",
    ring: "ring-violet-200",
  },
  lime: {
    bg: "bg-lime-100",
    text: "text-lime-700",
    border: "border-lime-300",
    ring: "ring-lime-200",
  },
};

export default function PrivacyPage() {
  return (
    <main className="bg-amber-50 min-h-screen">
      {}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 py-16 sm:py-20 text-white">
        {}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-2 mb-6">
              <span className="text-lg">🔒</span>
              <span className="text-xs font-bold uppercase tracking-widest">
                Privacy & Trust
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Your Data,{" "}
              <span className="bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">
                Your Control
              </span>
            </h1>

            <p className="text-lg text-emerald-100/90 max-w-2xl mx-auto mb-8">
              We believe privacy is a right, not a feature. Here's exactly how
              Mana Help AI handles your information.
            </p>

            {}
            <div className="flex flex-wrap gap-3 justify-center">
              <div className="bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-2 text-sm font-semibold">
                📅 Last updated: October 2026
              </div>
              <div className="bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-2 text-sm font-semibold">
                ⏱️ 3 min read
              </div>
              <div className="bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-2 text-sm font-semibold">
                ✅ 6 sections
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="relative -mt-8 z-10 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl shadow-emerald-100/50 border border-emerald-100 p-6 sm:p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {[
                { icon: "🚫", label: "No storage", sub: "Documents deleted" },
                { icon: "🔐", label: "Encrypted", sub: "HTTPS end-to-end" },
                { icon: "👤", label: "No signup", sub: "Anonymous use" },
                { icon: "🆓", label: "Forever free", sub: "No hidden charges" },
              ].map((b) => (
                <div
                  key={b.label}
                  className="flex flex-col items-center text-center gap-2 p-3 rounded-2xl hover:bg-emerald-50/50 transition"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-100 to-green-50 flex items-center justify-center text-2xl">
                    {b.icon}
                  </div>
                  <p className="text-sm font-bold text-emerald-950">
                    {b.label}
                  </p>
                  <p className="text-xs text-emerald-900/60">{b.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-10">
            {}
            <aside className="hidden lg:block lg:col-span-4">
              <div className="sticky top-24">
                <div className="bg-white rounded-3xl border border-emerald-100 p-6 shadow-sm">
                  <p className="text-xs font-bold text-emerald-700 uppercase tracking-widest mb-4">
                    📋 Contents
                  </p>
                  <nav className="flex flex-col gap-1">
                    {sections.map((s) => (
                      <a
                        key={s.id}
                        href={`#${s.id}`}
                        className="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-emerald-900/70 hover:text-emerald-700 hover:bg-emerald-50 transition"
                      >
                        <span className="text-xs font-bold text-emerald-500 w-6">
                          {s.num}
                        </span>
                        <span className="flex-1">{s.title}</span>
                        <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition">
                          →
                        </span>
                      </a>
                    ))}
                  </nav>
                </div>

                {}
                <div className="mt-4 bg-gradient-to-br from-emerald-600 to-green-700 rounded-3xl p-6 text-white shadow-lg">
                  <p className="text-2xl mb-2">💬</p>
                  <p className="text-sm font-bold mb-1">Need help?</p>
                  <p className="text-xs opacity-90 mb-3">
                    Questions about your privacy?
                  </p>
                  <a
                    href="mailto:hello@manahelpai.in"
                    className="inline-flex items-center gap-1 text-xs font-bold text-amber-300 hover:text-amber-200"
                  >
                    Contact us →
                  </a>
                </div>
              </div>
            </aside>

            {}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {sections.map((s) => {
                const c = colorMap[s.color];
                return (
                  <article
                    key={s.id}
                    id={s.id}
                    className="group scroll-mt-24 bg-white rounded-3xl border border-emerald-100 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-100/40 transition-all overflow-hidden"
                  >
                    {}
                    <div
                      className={`h-1.5 bg-gradient-to-r ${
                        s.color === "emerald"
                          ? "from-emerald-400 to-green-500"
                          : s.color === "amber"
                          ? "from-amber-400 to-orange-500"
                          : s.color === "sky"
                          ? "from-sky-400 to-blue-500"
                          : s.color === "rose"
                          ? "from-rose-400 to-pink-500"
                          : s.color === "violet"
                          ? "from-violet-400 to-purple-500"
                          : "from-lime-400 to-green-500"
                      }`}
                    />

                    <div className="p-6 sm:p-8">
                      <div className="flex items-start gap-5">
                        {}
                        <div className="flex-shrink-0">
                          <div
                            className={`relative w-14 h-14 rounded-2xl ${c.bg} flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform`}
                          >
                            {s.icon}
                          </div>
                          <div
                            className={`absolute mt-1 ml-1 w-7 h-7 bg-gradient-to-br from-emerald-500 to-green-600 text-white text-[11px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-md`}
                            style={{ marginTop: "-2.5rem", marginLeft: "3rem" }}
                          >
                            {s.num}
                          </div>
                        </div>

                        {}
                        <div className="flex-1 min-w-0">
                          <h2 className="text-xl sm:text-2xl font-bold text-emerald-950 mb-1">
                            {s.title}
                          </h2>
                          <p className={`text-xs font-bold ${c.text} mb-4`}>
                            {s.titleTe}
                          </p>
                          <p className="text-base text-emerald-900/70 leading-relaxed">
                            {s.body}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}


            </div>
          </div>
        </div>
      </section>

      {}
      <section className="py-12 bg-white border-t border-emerald-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm text-emerald-900/60">
            This privacy policy is informational. For legal questions, please
            consult a qualified professional.
          </p>
          <p className="text-xs text-emerald-900/40 mt-3">
            © 2026 Mana Help AI · Built with ❤️ for rural India
          </p>
        </div>
      </section>
    </main>
  );
}