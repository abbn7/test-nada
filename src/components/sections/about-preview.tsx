import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/glass/motion-primitives";
import { profile } from "@/lib/data/profile";
import { useI18n } from "@/lib/i18n/context";

const OUTCOMES = [
  { en: "Pixel-perfect UI systems", ar: "أنظمة واجهات دقيقة" },
  { en: "Performance-minded delivery", ar: "تسليم واعي بالأداء" },
  { en: "AI-accelerated workflow", ar: "سير عمل مدعوم بالذكاء الاصطناعي" },
] as const;

export function AboutPreview() {
  const { lang, t } = useI18n();
  const highlights = lang === "ar" ? profile.highlights.ar : profile.highlights.en;

  return (
    <section className="section-shell liquid-section">
      <div className="container-premium">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.25fr] lg:gap-16">
          <Reveal>
            <div className="sticky top-28">
              <div className="eyebrow mb-3">{t("About", "عن")}</div>
              <h2 className="premium-heading text-4xl sm:text-5xl">
                {t("A builder, first.", "صانع، أولاً.")}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-[var(--text-soft)]">
                {t(profile.summary.en, profile.summary.ar)}
              </p>
              <div className="mt-6 space-y-2">
                {OUTCOMES.map((item, i) => (
                  <div
                    key={item.en}
                    className="glass-pill inline-flex w-full items-center gap-3 px-4 py-2 text-sm text-[var(--text-soft)]"
                  >
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--accent-1)]/15 font-mono text-[10px] text-[var(--text)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {t(item.en, item.ar)}
                  </div>
                ))}
              </div>
              <Link
                to="/about"
                className="glass-pill glass-interactive mt-8 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[var(--text)]"
              >
                {t("Read the full story ->", "اقرأ القصة كاملة ->")}
              </Link>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {highlights.map((h, i) => (
              <Reveal key={h.title} delay={i * 0.06}>
                <div className="glass-card glass-interactive glass-edge noise-overlay group h-full p-6">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-[var(--accent-1)]/30 to-[var(--accent-3)]/30 text-[11px] font-semibold text-[var(--text)]">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <span className="h-px flex-1 bg-gradient-to-r from-[var(--border-strong)] to-transparent ms-4 opacity-70" />
                  </div>
                  <h3 className="font-display text-2xl font-medium leading-tight text-[var(--text)]">
                    {h.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-soft)]">{h.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
