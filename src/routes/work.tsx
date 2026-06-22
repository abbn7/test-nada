import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Reveal, SplitText } from "@/components/glass/motion-primitives";
import { profile } from "@/lib/data/profile";
import { useI18n } from "@/lib/i18n/context";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — Abdelhamed Nada" },
      {
        name: "description",
        content:
          "Selected projects and case studies by Abdelhamed Nada — GitHub Bot SaaS, E-Commerce platforms, and more.",
      },
      { property: "og:title", content: "Work — Abdelhamed Nada" },
      {
        property: "og:description",
        content: "Selected projects and case studies by Abdelhamed Nada.",
      },
      { property: "og:url", content: "/work" },
    ],
    links: [{ rel: "canonical", href: "/work" }],
  }),
  component: WorkPage,
});

function WorkPage() {
  const { lang, t } = useI18n();
  return (
    <section className="relative px-4 pt-32 sm:px-6 sm:pt-40">
      <div className="aurora-mesh pointer-events-none absolute inset-x-0 top-0 -z-10 h-[34rem] opacity-35" />
      <header className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_0.42fr] lg:items-end">
        <div>
          <div className="eyebrow mb-4">{t("Selected work", "أعمال مختارة")}</div>
          <h1 className="premium-heading text-5xl sm:text-7xl">
            <SplitText text={t("Shipped with care.", "أُنجزت بعناية.")} />
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-soft)]">
            {t(
              "A small set of projects I'm proud of — production-grade applications and open-source tools, each with a dedicated case study.",
              "مجموعة صغيرة من المشاريع التي أعتز بها — تطبيقات جاهزة للإنتاج وأدوات مفتوحة المصدر، لكل منها دراسة حالة مخصصة.",
            )}
          </p>
        </div>
        <Reveal delay={0.16}>
          <div className="glass-strong glass-edge noise-overlay rounded-[2rem] p-6">
            <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--text-faint)]">
              {t("Project signal", "إشارة المشاريع")}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="metric-tile p-4">
                <div className="font-display text-3xl text-[var(--text)]">
                  {profile.projects.length}
                </div>
                <div className="text-xs text-[var(--text-soft)]">{t("Case studies", "دراسات")}</div>
              </div>
              <div className="metric-tile p-4">
                <div className="font-display text-3xl text-[var(--text)]">2024</div>
                <div className="text-xs text-[var(--text-soft)]">{t("Shipping", "نشر")}</div>
              </div>
            </div>
          </div>
        </Reveal>
      </header>

      <div className="mx-auto mt-16 max-w-6xl space-y-6 pb-20">
        {profile.projects.map((p, i) => {
          const title = lang === "ar" ? p.title.ar : p.title.en;
          const tag = lang === "ar" ? p.tagline.ar : p.tagline.en;
          const role = lang === "ar" ? p.role.ar : p.role.en;
          const summary = lang === "ar" ? p.summary.ar : p.summary.en;
          return (
            <Reveal key={p.slug} delay={i * 0.06}>
              <Link
                to="/work/$slug"
                params={{ slug: p.slug }}
                className="glass-card glass-interactive glass-edge noise-overlay group block overflow-hidden p-2"
              >
                <div className="grid gap-5 md:grid-cols-[1.05fr_1.45fr]">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[var(--surface-soft)] md:aspect-auto">
                    {p.cover ? (
                      <img
                        src={p.cover}
                        alt={title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                      />
                    ) : (
                      <div className="grid h-full w-full place-items-center aurora-mesh">
                        <span className="glass-strong rounded-[1.5rem] px-5 py-3 text-[10px] uppercase tracking-[0.24em] text-[var(--text-soft)]">
                          {t("Case study", "دراسة حالة")}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-x-3 top-3 flex items-center justify-between">
                      <span className="glass-pill px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[var(--text-soft)]">
                        {p.period}
                      </span>
                      {p.live && (
                        <span className="glass-pill inline-flex items-center gap-1 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[var(--text-soft)]">
                          <ExternalLink size={10} /> Live
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center gap-4 p-4 sm:p-6">
                    <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-[var(--text-faint)]">
                      <span>{role}</span>
                      <span className="h-1 w-1 rounded-full bg-[var(--text-faint)]" />
                      <span>{lang === "ar" ? p.type.ar : p.type.en}</span>
                    </div>
                    <h2 className="font-display text-3xl font-medium leading-tight text-[var(--text)] sm:text-4xl">
                      {title}
                    </h2>
                    <p className="text-base leading-relaxed text-[var(--text-soft)]">{tag}</p>
                    <p className="line-clamp-3 text-sm leading-relaxed text-[var(--text-faint)]">
                      {summary}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.stack.map((s) => (
                        <span
                          key={s}
                          className="glass-pill px-2.5 py-1 text-[10px] text-[var(--text-soft)]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <div className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--text)]">
                      {t("Read case study", "اقرأ دراسة الحالة")} <ArrowUpRight size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
