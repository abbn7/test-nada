import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { lazy, Suspense, useEffect, useState } from "react";
import { SplitText } from "@/components/glass/motion-primitives";
import { profile } from "@/lib/data/profile";
import { useI18n } from "@/lib/i18n/context";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const HeroScene = lazy(() => import("./hero-scene"));

export function Hero() {
  const { lang, t } = useI18n();
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const displayName = lang === "ar" ? profile.name.ar : profile.name.en;
  const tagline = t(profile.tagline.en, profile.tagline.ar);

  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden px-4 pt-24 sm:px-6 sm:pt-28">
      {/* WebGL scene — client only */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 aurora-mesh opacity-60" />
        {mounted && !reduced && (
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        )}
      </div>

      <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <div className="relative z-10 flex flex-col justify-center">
          {/* Status pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass-pill mb-6 inline-flex w-fit items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-[var(--text-soft)]"
          >
            <span className="relative grid h-2 w-2 place-items-center">
              <span className="absolute inset-0 animate-ping rounded-full bg-[var(--success)] opacity-60" />
              <span className="h-2 w-2 rounded-full bg-[var(--success)]" />
            </span>
            {t(profile.status.en, profile.status.ar)}
          </motion.div>

          {/* Roles eyebrow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-4 flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.32em] text-[var(--text-faint)]"
          >
            {(lang === "ar" ? profile.roles.ar : profile.roles.en).map((r, i, arr) => (
              <span key={r} className="inline-flex items-center gap-2">
                {r}
                {i < arr.length - 1 && <span className="text-[var(--accent-1)]">·</span>}
              </span>
            ))}
          </motion.div>

          {/* Headline */}
          <h1 className="font-display text-[clamp(2.5rem,8vw,5.5rem)] font-medium leading-[0.95] text-[var(--text)]">
            <SplitText text={displayName} delay={0.3} />
            <span className="mt-2 block text-gradient">
              <SplitText
                text={t("Engineering modern web.", "أبني الويب الحديث.")}
                delay={0.8}
              />
            </span>
          </h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-balance text-base leading-relaxed text-[var(--text-soft)] sm:text-lg"
          >
            {tagline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link
              to="/work"
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--text)] px-6 py-3 text-sm font-medium text-[var(--bg)] shadow-[0_10px_40px_-10px_var(--text)]/30 transition-all hover:scale-[1.03] active:scale-[0.97]"
            >
              {t("View selected work", "شاهد الأعمال")}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </Link>
            <Link
              to="/contact"
              className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-[var(--text)] transition-all hover:scale-[1.03] active:scale-[0.97]"
            >
              <Sparkles size={14} />
              {t("Start a project", "ابدأ مشروعاً")}
            </Link>
          </motion.div>

          {/* Tiny meta strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2 }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.2em] text-[var(--text-faint)]"
          >
            <span>{t("Based in Egypt", "من مصر")}</span>
            <span className="h-1 w-1 rounded-full bg-[var(--text-faint)]" />
            <span>{t("Working worldwide", "أعمل عالمياً")}</span>
            <span className="h-1 w-1 rounded-full bg-[var(--text-faint)]" />
            <span>EN · العربية</span>
          </motion.div>
        </div>

        {/* Right column intentionally empty on desktop — orb fills space */}
        <div className="hidden lg:block" />
      </div>

      {/* Scroll indicator */}
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
    </section>
  );
}
