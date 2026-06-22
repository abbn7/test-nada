import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Code2, Layers3, Rocket, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/glass/motion-primitives";
import { profile } from "@/lib/data/profile";
import { useI18n } from "@/lib/i18n/context";

const BENCHMARKS = [
  {
    icon: Layers3,
    en: "Narrative depth",
    ar: "عمق السرد",
    bodyEn: "Clear story, strong proof points, and a route for every important decision.",
    bodyAr: "قصة واضحة، نقاط إثبات قوية، ومسار لكل قرار مهم.",
  },
  {
    icon: Code2,
    en: "Technical signal",
    ar: "إشارة تقنية",
    bodyEn: "Stack, constraints, process, and outcomes stay visible without overwhelming the UI.",
    bodyAr: "التقنيات والقيود والمسار والنتائج ظاهرة بدون ازدحام بصري.",
  },
  {
    icon: ShieldCheck,
    en: "Trust polish",
    ar: "صقل الثقة",
    bodyEn:
      "Contact paths, live GitHub data, and bilingual UX make the portfolio feel production-ready.",
    bodyAr: "مسارات التواصل وبيانات GitHub الحية وتجربة اللغتين تجعل البورتفوليو جاهزاً للإنتاج.",
  },
] as const;

const FLOW = [
  {
    en: "Discover",
    ar: "فهم",
    detailEn: "Goals, users, and constraints",
    detailAr: "الأهداف والمستخدمون والقيود",
  },
  {
    en: "Design",
    ar: "تصميم",
    detailEn: "Hierarchy, motion, and glass system",
    detailAr: "الهرمية والحركة ونظام الزجاج",
  },
  {
    en: "Build",
    ar: "بناء",
    detailEn: "React, TypeScript, and clean delivery",
    detailAr: "React وTypeScript وتسليم نظيف",
  },
  {
    en: "Ship",
    ar: "نشر",
    detailEn: "Performance, SEO, and handoff",
    detailAr: "الأداء وSEO والتسليم",
  },
] as const;

export function ExperienceRadar() {
  const { t } = useI18n();
  const coreSkills = profile.skills.Frontend.slice(0, 6);

  return (
    <section className="section-shell liquid-section">
      <div className="container-premium">
        <Reveal>
          <div className="glass-strong glass-edge glass-panel-grid noise-overlay overflow-hidden rounded-[2.25rem] p-6 sm:p-8 lg:p-10">
            <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
              <div>
                <div className="eyebrow mb-3">{t("Competitive edge", "نقطة التميز")}</div>
                <h2 className="premium-heading text-4xl sm:text-5xl">
                  {t("Built like a product, not a template.", "مبني كمنتج، وليس قالباً.")}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-[var(--text-soft)]">
                  {t(
                    "The upgrade targets what premium developer portfolios do best: immediate clarity, memorable motion, visible proof, and frictionless contact while keeping the Liquid Glass identity intact.",
                    "التطوير يركز على ما تفعله بورتفوليوهات المطورين الممتازة: وضوح فوري، حركة لا تُنسى، إثبات ظاهر، وتواصل سهل مع الحفاظ على هوية Liquid Glass.",
                  )}
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {coreSkills.map((skill) => (
                    <span
                      key={skill}
                      className="glass-pill px-3 py-1.5 text-xs text-[var(--text-soft)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <Link
                  to="/contact"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--text)] px-5 py-2.5 text-sm font-medium text-[var(--bg)] transition-all hover:scale-[1.03] active:scale-[0.97]"
                >
                  {t("Build with me", "ابنِ معي")}
                  <ArrowUpRight size={14} />
                </Link>
              </div>

              <div className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-3">
                  {BENCHMARKS.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <Reveal key={item.en} delay={i * 0.05}>
                        <div className="metric-tile h-full p-5">
                          <div className="mb-4 grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-[var(--accent-1)]/25 to-[var(--accent-3)]/25 text-[var(--text)]">
                            <Icon size={18} />
                          </div>
                          <h3 className="font-display text-xl text-[var(--text)]">
                            {t(item.en, item.ar)}
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-[var(--text-soft)]">
                            {t(item.bodyEn, item.bodyAr)}
                          </p>
                        </div>
                      </Reveal>
                    );
                  })}
                </div>

                <div className="glass-card glass-edge noise-overlay p-5">
                  <div className="mb-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.26em] text-[var(--text-faint)]">
                    <Rocket size={13} /> {t("Delivery flow", "مسار التسليم")}
                  </div>
                  <div className="grid gap-3 sm:grid-cols-4">
                    {FLOW.map((step, i) => (
                      <div
                        key={step.en}
                        className="relative rounded-2xl border border-[var(--glass-border)] bg-[var(--surface)] p-4"
                      >
                        <div className="font-mono text-[10px] text-[var(--text-faint)]">
                          {String(i + 1).padStart(2, "0")}
                        </div>
                        <div className="mt-2 font-display text-lg text-[var(--text)]">
                          {t(step.en, step.ar)}
                        </div>
                        <p className="mt-1 text-xs leading-relaxed text-[var(--text-soft)]">
                          {t(step.detailEn, step.detailAr)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
