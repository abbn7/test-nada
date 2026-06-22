import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Reveal } from "@/components/glass/motion-primitives";
import { profile } from "@/lib/data/profile";
import { useI18n } from "@/lib/i18n/context";

export function FeaturedWork() {
  const { lang, t } = useI18n();
  return (
    <section className="section-shell liquid-section">
      <div className="container-premium">
        <Reveal>
          <div className="mb-12 grid gap-6 lg:grid-cols-[1fr_0.72fr] lg:items-end">
            <div>
              <div className="eyebrow mb-3">{t("Selected work", "أعمال مختارة")}</div>
              <h2 className="premium-heading text-4xl sm:text-5xl">
                {t("Things I've shipped.", "ما أنجزته من مشاريع.")}
              </h2>
            </div>
            <div className="flex flex-col gap-4 lg:items-end">
              <p className="max-w-md text-sm leading-relaxed text-[var(--text-soft)] lg:text-end">
                {t(
                  "Case studies with real constraints: bugs fixed, architecture clarified, and production UX shipped.",
                  "دراسات حالة بقيود حقيقية: إصلاح أخطاء، توضيح بنية، وتجربة إنتاجية منشورة.",
                )}
              </p>
              <Link
                to="/work"
                className="glass-pill glass-interactive inline-flex w-fit shrink-0 items-center gap-1.5 px-4 py-2 text-sm font-medium text-[var(--text-soft)]"
              >
                {t("All projects", "كل المشاريع")} <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          {profile.projects.map((p, i) => {
            const title = lang === "ar" ? p.title.ar : p.title.en;
            const tag = lang === "ar" ? p.tagline.ar : p.tagline.en;
            const role = lang === "ar" ? p.role.ar : p.role.en;
            return (
              <Reveal key={p.slug} delay={i * 0.08}>
                <Link
                  to="/work/$slug"
                  params={{ slug: p.slug }}
                  className="group glass-card glass-interactive glass-edge noise-overlay block h-full overflow-hidden p-2"
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[var(--surface-soft)]">
                    {p.cover ? (
                      <motion.img
                        src={p.cover}
                        alt={title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                      />
                    ) : (
                      <div className="grid h-full w-full place-items-center aurora-mesh">
                        <div className="glass-strong rounded-[1.5rem] p-5 text-center">
                          <div className="text-[10px] uppercase tracking-[0.24em] text-[var(--text-faint)]">
                            {t("Case study", "دراسة حالة")}
                          </div>
                          <div className="mt-2 font-display text-2xl text-[var(--text)]">
                            {t("Commerce system", "نظام تجارة")}
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-x-3 top-3 flex items-center justify-between">
                      <span className="glass-pill px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-[var(--text-soft)]">
                        {p.period}
                      </span>
                      {p.live && (
                        <span className="glass-pill flex items-center gap-1 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-[var(--text-soft)]">
                          <ExternalLink size={10} /> Live
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 p-5">
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-[var(--text-faint)]">
                      <span>{role}</span>
                    </div>
                    <h3 className="font-display text-3xl font-medium leading-tight text-[var(--text)]">
                      {title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[var(--text-soft)]">{tag}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {p.stack.slice(0, 5).map((s) => (
                        <span
                          key={s}
                          className="glass-pill px-2.5 py-1 text-[10px] text-[var(--text-soft)]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <div className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--text)]">
                      {t("Explore case study", "استكشف دراسة الحالة")}
                      <ArrowUpRight
                        size={14}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
