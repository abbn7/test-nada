import { createFileRoute } from "@tanstack/react-router";
import { Reveal, SplitText } from "@/components/glass/motion-primitives";
import { profile } from "@/lib/data/profile";
import { useI18n } from "@/lib/i18n/context";

const GROUP_NOTES: Record<string, { en: string; ar: string }> = {
  Frontend: {
    en: "Interfaces, animation, systems, and polished product surfaces.",
    ar: "واجهات، حركة، أنظمة تصميم، وتجارب منتج مصقولة.",
  },
  Backend: {
    en: "APIs, data models, auth-aware flows, and reliable integrations.",
    ar: "واجهات API، نماذج بيانات، تدفقات واعية بالمصادقة، وتكاملات مستقرة.",
  },
  "AI & Tools": {
    en: "Faster research, implementation, debugging, and delivery loops.",
    ar: "بحث وتنفيذ وتصحيح وتسليم أسرع بجودة محفوظة.",
  },
  DevOps: {
    en: "Clean source control, deployment discipline, and production readiness.",
    ar: "تحكم نظيف بالمصدر، انضباط نشر، وجاهزية إنتاج.",
  },
  Other: {
    en: "Adjacent capabilities that turn interfaces into complete products.",
    ar: "مهارات مكملة تحول الواجهات إلى منتجات كاملة.",
  },
  Languages: {
    en: "Comfortable communication across local and remote teams.",
    ar: "تواصل مريح مع الفرق المحلية والبعيدة.",
  },
};

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skills — Abdelhamed Nada" },
      {
        name: "description",
        content:
          "Complete technical toolkit: React, Next.js, TypeScript, Supabase, AI tools, DevOps, and more.",
      },
      { property: "og:title", content: "Skills — Abdelhamed Nada" },
      {
        property: "og:description",
        content:
          "Complete technical toolkit: React, Next.js, TypeScript, Supabase, AI tools, DevOps, and more.",
      },
      { property: "og:url", content: "/skills" },
    ],
    links: [{ rel: "canonical", href: "/skills" }],
  }),
  component: SkillsPage,
});

function SkillsPage() {
  const { t } = useI18n();
  const groups = Object.entries(profile.skills);
  const totalSkills = groups.reduce((sum, [, items]) => sum + items.length, 0);

  return (
    <section className="relative px-4 pt-32 pb-20 sm:px-6 sm:pt-40">
      <div className="aurora-mesh pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem] opacity-35" />
      <header className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_0.48fr] lg:items-end">
        <div>
          <div className="eyebrow mb-4">{t("Toolkit", "أدواتي")}</div>
          <h1 className="premium-heading text-5xl sm:text-7xl">
            <SplitText text={t("Tools I reach for.", "الأدوات التي أعتمد عليها.")} />
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-soft)]">
            {t(
              "A curated stack — every item is something I use in real, shipped work. No buzzword padding.",
              "حزمة منتقاة — كل عنصر مستخدم فعلياً في مشاريع منشورة. بدون حشو رنّان.",
            )}
          </p>
        </div>
        <Reveal delay={0.18}>
          <div className="glass-strong glass-edge noise-overlay rounded-[2rem] p-6">
            <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--text-faint)]">
              {t("Stack depth", "عمق الحزمة")}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="metric-tile p-4">
                <div className="font-display text-3xl text-[var(--text)]">{totalSkills}</div>
                <div className="text-xs text-[var(--text-soft)]">{t("Tools", "أداة")}</div>
              </div>
              <div className="metric-tile p-4">
                <div className="font-display text-3xl text-[var(--text)]">{groups.length}</div>
                <div className="text-xs text-[var(--text-soft)]">{t("Areas", "مجالات")}</div>
              </div>
            </div>
          </div>
        </Reveal>
      </header>

      <div className="mx-auto mt-16 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map(([group, items], i) => {
          const note = GROUP_NOTES[group] ?? GROUP_NOTES.Other;
          return (
            <Reveal key={group} delay={i * 0.05}>
              <div className="glass-card glass-interactive glass-edge noise-overlay h-full p-6">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-display text-2xl font-medium text-[var(--text)]">
                      {group}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--text-soft)]">
                      {t(note.en, note.ar)}
                    </p>
                  </div>
                  <span className="glass-pill px-2.5 py-0.5 font-mono text-[10px] text-[var(--text-soft)]">
                    {String(items.length).padStart(2, "0")}
                  </span>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {items.map((s) => (
                    <li
                      key={s}
                      className="glass-pill px-3 py-1.5 text-sm text-[var(--text-soft)] transition-colors hover:text-[var(--text)] focus-within:text-[var(--text)]"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
