import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Github, Mail, Sparkles } from "lucide-react";
import { lazy, Suspense, useEffect, useState } from "react";
import { SplitText } from "@/components/glass/motion-primitives";
import { profile } from "@/lib/data/profile";
import { useI18n } from "@/lib/i18n/context";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const HeroScene = lazy(() => import("./hero-scene"));

const METRICS = [
  { en: "Production apps", ar: "تطبيقات إنتاجية", value: "02+" },
  { en: "Frontend focus", ar: "تركيز Frontend", value: "Pixel" },
  { en: "AI workflow", ar: "سير عمل AI", value: "Fast" },
] as const;

const FEATURED_STACK = ["React", "Next.js", "TypeScript", "Supabase", "Framer Motion"];

export function Hero() {
  const { lang, t } = useI18n();
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const displayName = lang === "ar" ? profile.name.ar : profile.name.en;
  const tagline = t(profile.tagline.en, profile.tagline.ar);

  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden px-4 pt-28 sm:px-6 sm:pt-32">
      <div className="absolute inset-0 -z-10">
        <div className="aurora-mesh absolute inset-0 opacity-70" />
        <div className="subtle-grid absolute inset-x-0 top-20 h-[78vh] opacity-30" />
        <div className="glow-orb absolute right-[-10rem] top-24 h-[28rem] w-[28rem] opacity-50 rtl:left-[-10rem] rtl:right-auto" />
        <div className="glow-orb absolute bottom-[-12rem] left-[-12rem] h-[30rem] w-[30rem] opacity-35 rtl:left-auto rtl:right-[-12rem]" />
        {mounted && !reduced && (
          <Suspense fallback={<div className="aurora-mesh absolute inset-0 opacity-30" />}>
            <HeroScene />
          </Suspense>
        )}
      </div>

      <div className="container-premium grid w-full items-center gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
        <div className="relative z-10 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass-pill mb-6 inline-flex w-fit items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-[var(--text-soft)]"
          >
            <span className="relative grid h-2 w-2 place-items-center">
              {!reduced && (
                <span className="absolute inset-0 animate-ping rounded-full bg-[var(--success)] opacity-60" />
              )}
              <span className="h-2 w-2 rounded-full bg-[var(--success)]" />
            </span>
            {t(profile.status.en, profile.status.ar)}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-4 flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.32em] text-[var(--text-faint)] rtl:tracking-[0.12em]"
          >
            {(lang === "ar" ? profile.roles.ar : profile.roles.en).map((r, i, arr) => (
              <span key={r} className="inline-flex items-center gap-2">
                {r}
                {i < arr.length - 1 && <span className="text-[var(--accent-1)]">·</span>}
              </span>
            ))}
          </motion.div>

          <h1 className="premium-heading text-[clamp(3rem,8vw,6.4rem)] leading-[0.9]">
            <SplitText text={displayName} delay={0.3} />
            <span className="mt-3 block text-gradient">
              <SplitText text={t("Engineering modern web.", "أبني الويب الحديث.")} delay={0.8} />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-2xl text-balance text-base leading-relaxed text-[var(--text-soft)] sm:text-lg"
          >
            {tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link
              to="/work"
              className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-[var(--text)] px-6 py-3 text-sm font-medium text-[var(--bg)] shadow-[0_10px_40px_-10px_var(--text)]/30 transition-all hover:scale-[1.03] active:scale-[0.97]"
            >
              {t("View selected work", "شاهد الأعمال")}
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
              />
            </Link>
            <Link
              to="/contact"
              className="glass glass-interactive inline-flex min-h-12 items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-[var(--text)]"
            >
              <Sparkles size={14} />
              {t("Start a project", "ابدأ مشروعاً")}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 grid max-w-2xl gap-3 sm:grid-cols-3"
          >
            {METRICS.map((metric) => (
              <div key={metric.en} className="metric-tile px-4 py-3">
                <div className="font-display text-2xl font-medium text-[var(--text)]">
                  {metric.value}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[var(--text-faint)] rtl:tracking-[0.08em]">
                  {t(metric.en, metric.ar)}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.1 }}
            className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] uppercase tracking-[0.2em] text-[var(--text-faint)] rtl:tracking-[0.1em]"
          >
            <span>{t("Based in Egypt", "من مصر")}</span>
            <span className="h-1 w-1 rounded-full bg-[var(--text-faint)]" />
            <span>{t("Working worldwide", "أعمل عالمياً")}</span>
            <span className="h-1 w-1 rounded-full bg-[var(--text-faint)]" />
            <span>EN · العربية</span>
          </motion.div>
        </div>

        <motion.aside
          initial={{ opacity: 0, x: lang === "ar" ? -28 : 28, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 hidden lg:block"
          aria-label={t("Portfolio preview", "معاينة البورتفوليو")}
        >
          <div className="orbit-line absolute left-1/2 top-1/2 h-[29rem] w-[29rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-45" />
          <div className="orbit-line absolute left-1/2 top-1/2 h-[21rem] w-[21rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-35" />
          <div className="glass-strong glass-edge glass-panel-grid noise-overlay premium-ring relative overflow-hidden rounded-[2.25rem] p-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-[var(--surface-soft)]">
              <img
                src={profile.portrait}
                alt={displayName}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/72 via-transparent to-transparent" />
              <div className="absolute inset-x-4 bottom-4">
                <div className="glass-card p-4">
                  <div className="text-[10px] uppercase tracking-[0.26em] text-[var(--text-faint)]">
                    {t("Currently building", "يبني حالياً")}
                  </div>
                  <div className="mt-2 font-display text-2xl font-medium text-[var(--text)]">
                    {t("Production-grade interfaces", "واجهات جاهزة للإنتاج")}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {FEATURED_STACK.map((item) => (
                      <span
                        key={item}
                        className="glass-pill px-2.5 py-1 text-[10px] text-[var(--text-soft)]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <a
                href={profile.contact.github}
                target="_blank"
                rel="noopener"
                className="glass glass-interactive flex items-center gap-2 rounded-2xl px-4 py-3 text-xs font-medium text-[var(--text-soft)]"
              >
                <Github size={14} /> @{profile.contact.githubUser}
              </a>
              <a
                href={`mailto:${profile.contact.email}`}
                className="glass glass-interactive flex items-center gap-2 rounded-2xl px-4 py-3 text-xs font-medium text-[var(--text-soft)]"
              >
                <Mail size={14} /> {t("Email", "البريد")}
              </a>
            </div>
          </div>
        </motion.aside>
      </div>

      {!reduced && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 0.8 }}
          className="pointer-events-none absolute inset-x-0 bottom-8 mx-auto flex justify-center"
        >
          <div className="glass-pill flex items-center gap-2 px-3 py-1.5 text-[10px] uppercase tracking-[0.32em] text-[var(--text-faint)]">
            <span>{t("Scroll", "مرر")}</span>
            <span className="relative inline-block h-3 w-px overflow-hidden">
              <motion.span
                className="absolute inset-x-0 -top-3 h-3 bg-[var(--text-faint)]"
                animate={{ y: [0, 12, 12] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
          </div>
        </motion.div>
      )}
    </section>
  );
}
