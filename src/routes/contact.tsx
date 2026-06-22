import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { motion } from "framer-motion";
import { Check, Copy, Github, Loader2, Mail, MessageCircle, Send } from "lucide-react";
import { useState } from "react";
import { Reveal, SplitText } from "@/components/glass/motion-primitives";
import { submitContact } from "@/lib/api/contact.functions";
import { profile, whatsappUrl } from "@/lib/data/profile";
import { useI18n } from "@/lib/i18n/context";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Abdelhamed Nada" },
      {
        name: "description",
        content: "Get in touch with Abdelhamed Nada. WhatsApp, email, or a quick contact form.",
      },
      { property: "og:title", content: "Contact — Abdelhamed Nada" },
      {
        property: "og:description",
        content: "Get in touch with Abdelhamed Nada. WhatsApp, email, or a quick contact form.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { lang, t } = useI18n();
  const submit = useServerFn(submitContact);

  const [form, setForm] = useState({ name: "", email: "", message: "", website: "" });
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [copied, setCopied] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    try {
      await submit({ data: form });
      setState("sent");
      setForm({ name: "", email: "", message: "", website: "" });
    } catch {
      setState("error");
    }
  }

  async function copyEmail() {
    await navigator.clipboard.writeText(profile.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <section className="relative px-4 pt-32 pb-20 sm:px-6 sm:pt-40">
      <div className="aurora-mesh pointer-events-none absolute inset-x-0 top-0 -z-10 h-[34rem] opacity-35" />
      <header className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_0.46fr] lg:items-end">
        <div>
          <div className="eyebrow mb-4">{t("Contact", "تواصل")}</div>
          <h1 className="premium-heading text-5xl sm:text-7xl">
            <SplitText text={t("Say hello.", "قل مرحباً.")} />
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-soft)]">
            {t(
              "The fastest way to reach me is WhatsApp — I reply quickly. Email and the contact form below both reach my inbox.",
              "أسرع طريقة للوصول إليّ هي WhatsApp — أرد بسرعة. البريد والنموذج بالأسفل أيضاً يصلانني.",
            )}
          </p>
        </div>
        <Reveal delay={0.16}>
          <div className="glass-strong glass-edge noise-overlay rounded-[2rem] p-6">
            <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--text-faint)]">
              {t("Response signal", "سرعة الرد")}
            </div>
            <div className="mt-4 font-display text-4xl text-[var(--text)]">24h</div>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-soft)]">
              {t(
                "Remote roles, freelance builds, and collaborations.",
                "أدوار عن بعد، مشاريع مستقلة، وتعاونات.",
              )}
            </p>
          </div>
        </Reveal>
      </header>

      <div className="mx-auto mt-14 grid max-w-6xl gap-6 lg:grid-cols-[0.92fr_1.2fr]">
        <div className="space-y-4">
          <Reveal>
            <a
              href={whatsappUrl(lang)}
              target="_blank"
              rel="noopener"
              className="glass-card glass-interactive glass-edge noise-overlay group block p-6"
            >
              <div className="flex items-center justify-between">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[var(--success)]/30 to-[var(--accent-3)]/30">
                  <MessageCircle size={18} />
                </div>
                <span className="glass-pill px-2.5 py-1 text-[10px] uppercase tracking-[0.24em] text-[var(--text-faint)]">
                  {t("Fastest", "الأسرع")}
                </span>
              </div>
              <h3 className="mt-4 font-display text-2xl">WhatsApp</h3>
              <p className="mt-1 text-sm text-[var(--text-soft)]">{profile.contact.phoneDisplay}</p>
              <p className="mt-3 text-xs text-[var(--text-faint)]">
                {t("Opens with a pre-filled introduction message.", "يفتح برسالة تعريفية جاهزة.")}
              </p>
            </a>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="glass-card glass-interactive glass-edge noise-overlay p-6">
              <div className="flex items-center justify-between">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[var(--accent-1)]/30 to-[var(--accent-2)]/30">
                  <Mail size={18} />
                </div>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="glass-pill inline-flex items-center gap-1.5 px-3 py-1 text-[11px] text-[var(--text-soft)]"
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  {copied ? t("Copied", "تم النسخ") : t("Copy", "نسخ")}
                </button>
              </div>
              <h3 className="mt-4 font-display text-2xl">{t("Email", "البريد")}</h3>
              <a
                href={`mailto:${profile.contact.email}`}
                className="mt-1 inline-block text-sm text-[var(--text-soft)] hover:text-[var(--text)]"
              >
                {profile.contact.email}
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <a
              href={profile.contact.github}
              target="_blank"
              rel="noopener"
              className="glass-card glass-interactive glass-edge noise-overlay group block p-6"
            >
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[var(--accent-4)]/30 to-[var(--accent-1)]/30">
                <Github size={18} />
              </div>
              <h3 className="mt-4 font-display text-2xl">GitHub</h3>
              <p className="mt-1 text-sm text-[var(--text-soft)]">@{profile.contact.githubUser}</p>
            </a>
          </Reveal>
        </div>

        <Reveal>
          <form
            onSubmit={onSubmit}
            className="glass-strong glass-edge noise-overlay rounded-[2rem] p-7 sm:p-9"
          >
            <h2 className="font-display text-3xl">{t("Send a message", "أرسل رسالة")}</h2>
            <p className="mt-2 text-sm text-[var(--text-soft)]">
              {t(
                "Tell me a little about your project. I respond within 24 hours.",
                "احكي لي قليلاً عن مشروعك. أرد خلال 24 ساعة.",
              )}
            </p>

            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
              className="absolute -left-[9999px] h-0 w-0 opacity-0"
              aria-hidden
            />

            <div className="mt-7 space-y-4">
              <Field
                label={t("Your name", "اسمك")}
                value={form.name}
                onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                required
              />
              <Field
                label={t("Email", "البريد")}
                value={form.email}
                onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                type="email"
                required
              />
              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-faint)]">
                  {t("Message", "الرسالة")}
                </label>
                <textarea
                  required
                  minLength={10}
                  maxLength={4000}
                  rows={6}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className="glass w-full resize-none rounded-2xl border border-[var(--glass-border)] bg-transparent px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--text-faint)] focus:outline-none focus:ring-2 focus:ring-[var(--glass-ring)]"
                  placeholder={t(
                    "Project goals, timeline, budget range — anything helps.",
                    "أهداف المشروع، الوقت، الميزانية — أي تفاصيل تساعد.",
                  )}
                />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={state === "sending"}
              whileTap={{ scale: 0.97 }}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--text)] px-6 py-3 text-sm font-medium text-[var(--bg)] transition-all hover:scale-[1.01] disabled:opacity-60"
            >
              {state === "sending" ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Send size={14} />
              )}
              {state === "sent"
                ? t("Sent — I'll be in touch.", "تم الإرسال — سأتواصل قريباً.")
                : state === "sending"
                  ? t("Sending...", "جارٍ الإرسال...")
                  : t("Send message", "أرسل الرسالة")}
            </motion.button>

            {state === "error" && (
              <p className="mt-3 text-center text-sm text-[var(--error)]">
                {t(
                  "Something went wrong. Please try WhatsApp or email instead.",
                  "حدث خطأ. جرب WhatsApp أو البريد.",
                )}
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-faint)]">
        {label}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="glass w-full rounded-full border border-[var(--glass-border)] bg-transparent px-4 py-2.5 text-sm text-[var(--text)] placeholder:text-[var(--text-faint)] focus:outline-none focus:ring-2 focus:ring-[var(--glass-ring)]"
      />
    </div>
  );
}
