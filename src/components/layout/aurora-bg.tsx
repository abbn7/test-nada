import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Animated aurora gradient backdrop. Sits behind everything.
 * Uses pure CSS animations + framer for subtle drift; no R3F overhead.
 */
export function AuroraBackdrop() {
  const reduced = useReducedMotion();
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    if (typeof window === "undefined" || reduced) return;
    let raf = 0;
    const handler = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
      });
    };
    window.addEventListener("pointermove", handler, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handler);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  const drift = reduced
    ? undefined
    : {
        transform: `translate3d(${(mouse.x - 0.5) * 24}px, ${(mouse.y - 0.5) * 24}px, 0)`,
        transition: "transform 1.2s cubic-bezier(0.22,1,0.36,1)",
      };

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[var(--bg)]" />
      <div className="subtle-grid absolute inset-0 opacity-[0.18]" />

      <motion.div
        className="aurora-mesh absolute -inset-[20%] opacity-90 blur-[2px]"
        style={drift}
        animate={reduced ? undefined : { scale: [1, 1.05, 1], rotate: [0, 1, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="aurora-mesh absolute -inset-[25%] opacity-50 blur-3xl"
        animate={reduced ? undefined : { scale: [1.1, 1, 1.1], rotate: [0, -2, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="glow-orb absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 opacity-35" />

      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--bg)_100%)]" />
    </div>
  );
}
