import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Monogram } from "@/components/glass/monogram";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useI18n } from "@/lib/i18n/context";

/**
 * Cinematic intro curtain. Shows once per session and respects reduced motion.
 */
export function IntroCurtain() {
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();
  const { lang } = useI18n();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = sessionStorage.getItem("an_intro_seen");
    if (seen || reduced) {
      sessionStorage.setItem("an_intro_seen", "1");
      return;
    }
    setVisible(true);
    const t = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("an_intro_seen", "1");
    }, 1900);
    return () => clearTimeout(t);
  }, [reduced]);

  useEffect(() => {
    if (!visible) return;
    const skip = () => {
      setVisible(false);
      sessionStorage.setItem("an_intro_seen", "1");
    };
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] } }}
          role="status"
          aria-label={
            lang === "ar" ? "تحميل تجربة عبد الحميد ندى" : "Loading Abdelhamed Nada experience"
          }
        >
          <div className="absolute inset-0 bg-[var(--bg)]" />
          <div className="aurora-mesh absolute inset-0 opacity-80" />
          <div className="subtle-grid absolute inset-0 opacity-20" />
          <div className="absolute inset-0 backdrop-blur-3xl" />

          <motion.div
            initial={{ scale: 0.72, opacity: 0, filter: "blur(18px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col items-center gap-6"
          >
            <div className="glow-orb absolute inset-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 opacity-60" />
            <Monogram size={120} animated withRing />
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.48, duration: 0.55 }}
              className="glass-pill px-4 py-2 text-[11px] uppercase tracking-[0.4em] text-[var(--text-soft)]"
            >
              {lang === "ar" ? "عبد الحميد ندى" : "Abdelhamed Nada"}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
