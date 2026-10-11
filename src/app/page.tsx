import Link from "next/link";

const features = [
  {
    icon: "🎤",
    title: "Speak in Telugu",
    titleTe: "తెలుగులో మాట్లాడండి",
    desc: "Ask questions with your voice. No typing needed. Works on any Android phone.",
  },
  {
    icon: "📄",
    title: "Snap a Document",
    titleTe: "పేపర్ ఫోటో తీయండి",
    desc: "Take a photo of any government letter, bill, or form. AI explains it in simple Telugu.",
  },
  {
    icon: "🔊",
    title: "Listen to Explanation",
    titleTe: "వివరణ వినండి",
    desc: "Hear the answer read aloud. Perfect for people who cannot read comfortably.",
  },
  {
    icon: "✅",
    title: "Know Next Steps",
    titleTe: "తదుపరి చర్యలు తెలుసుకోండి",
    desc: "Get clear, actionable steps. Know which office to visit and what documents to carry.",
  },
  {
    icon: "🔒",
    title: "Private by Design",
    titleTe: "గోప్యత రక్షణ",
    desc: "We do not save your documents. Your data is processed securely and deleted immediately.",
  },
  {
    icon: "🆓",
    title: "Completely Free",
    titleTe: "పూర్తిగా ఉచితం",
    desc: "No registration, no payment, no hidden charges. Free for everyone, forever.",
  },
];

export default function Home() {
  return (
    <main className="bg-amber-50">
      <section className="relative overflow-hidden min-h-screen flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-no-repeat bg-[position:right_center] sm:bg-[position:center_right]"
          style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-amber-50 via-amber-50/90 to-amber-50/30" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-emerald-100/60 to-transparent" />

        <div className="absolute top-20 right-0 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-300/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20 w-full">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 animate-fade-in">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur border border-emerald-200 rounded-full px-4 py-2 mb-6 shadow-md shadow-emerald-100/50">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  Free · Telugu-First · Voice-Enabled
                </span>
              </div>

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-emerald-950 leading-[1.1] mb-6">
                Understand any document in{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 bg-clip-text text-transparent">
                    simple Telugu
                  </span>
                </span>
              </h1>

              {/* Subtext */}
              <p className="text-lg sm:text-xl text-emerald-900/80 leading-relaxed mb-8 max-w-xl">
                Speak in Telugu. Show your document. Understand what to do
                next. Mana Help AI explains government letters, bills, and
                forms — in language you understand, with no typing needed.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/app"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white text-base font-bold rounded-full hover:from-emerald-600 hover:to-green-700 shadow-xl shadow-emerald-300/50 hover:shadow-emerald-400/50 hover:-translate-y-0.5 transition-all"
                >
                  <span className="text-xl">🚀</span>
                  Launch App — Free
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </Link>
                <Link
                  href="/how-it-works"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/90 backdrop-blur text-emerald-800 text-base font-bold rounded-full border-2 border-emerald-200 hover:border-emerald-400 hover:bg-white transition-all shadow-md"
                >
                  How it Works
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-6 mt-10 pt-6 border-t border-emerald-200/60">
                <div>
                  <p className="text-2xl font-bold text-emerald-900">100%</p>
                  <p className="text-xs text-emerald-700/70 font-medium">
                    Free forever
                  </p>
                </div>
                <div className="w-px bg-emerald-200" />
                <div>
                  <p className="text-2xl font-bold text-emerald-900">0</p>
                  <p className="text-xs text-emerald-700/70 font-medium">
                    Data saved
                  </p>
                </div>
                <div className="w-px bg-emerald-200" />
                <div>
                  <p className="text-2xl font-bold text-emerald-900">తెలుగు</p>
                  <p className="text-xs text-emerald-700/70 font-medium">
                    First language
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      { }
      <section className="bg-white py-16 sm:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold text-emerald-700 bg-emerald-50 px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
              The Problem
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-950 mb-4">
              Millions struggle with{" "}
              <span className="text-emerald-600">documents</span> every day
            </h2>
            <p className="text-lg text-emerald-900/70 max-w-2xl mx-auto">
              Government letters, bills, and forms are written in complex
              language. Many people depend on others to read and explain them.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "📬",
                title: "Confusing Letters",
                desc: "Government notices arrive in formal language that is hard to understand.",
                color: "from-amber-100 to-orange-50",
                border: "border-amber-200",
              },
              {
                icon: "📅",
                title: "Missed Deadlines",
                desc: "Important dates get overlooked because they are buried in text.",
                color: "from-rose-100 to-pink-50",
                border: "border-rose-200",
              },
              {
                icon: "🌐",
                title: "English Websites",
                desc: "Most official portals assume English literacy and digital skills.",
                color: "from-sky-100 to-blue-50",
                border: "border-sky-200",
              },
            ].map((item) => (
              <div
                key={item.title}
                className={`bg-gradient-to-br ${item.color} rounded-3xl p-7 border ${item.border} shadow-sm hover:shadow-md hover:-translate-y-1 transition-all`}
              >
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-3xl mb-5 shadow-sm">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-emerald-950 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-emerald-900/70 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      { }
      <section className="py-16 sm:py-24 bg-gradient-to-b from-amber-50 to-emerald-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold text-emerald-700 bg-white px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 shadow-sm">
              Features
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-950 mb-4">
              Everything you need in{" "}
              <span className="text-emerald-600">one app</span>
            </h2>
            <p className="text-lg text-emerald-900/70 max-w-2xl mx-auto">
              Designed for people with limited literacy. No typing, no English,
              no complexity.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="group bg-white rounded-3xl p-7 border border-emerald-100 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-100/50 hover:-translate-y-1 transition-all"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-100 to-green-50 flex items-center justify-center text-3xl mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-emerald-950 mb-1">
                  {f.title}
                </h3>
                <p className="text-sm font-bold text-emerald-600 mb-3">
                  {f.titleTe}
                </p>
                <p className="text-sm text-emerald-900/70 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}