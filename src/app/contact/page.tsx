
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact",
    description: "Get in touch with the Mana Help AI team.",
};

export default function ContactPage() {
    return (
        <main className="bg-white">
            <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16 sm:py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">
                        Contact
                    </p>
                    <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
                        Get in touch
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Questions, feedback, or partnership — we would love to hear from
                        you.
                    </p>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: "✉️",
                                title: "Email",
                                value: "hello@manahelpai.in",
                            },
                            {
                                icon: "📱",
                                title: "Phone",
                                value: "+91 XXXXX XXXXX",
                            },
                            {
                                icon: "📍",
                                title: "Location",
                                value: "Hyderabad, Telangana",
                            },
                        ].map((c) => (
                            <div
                                key={c.title}
                                className="bg-white border border-slate-200 rounded-2xl p-6 text-center"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center text-3xl mx-auto mb-4">
                                    {c.icon}
                                </div>
                                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-2">
                                    {c.title}
                                </h3>
                                <p className="text-base font-semibold text-slate-900">
                                    {c.value}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}