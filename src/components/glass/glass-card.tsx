import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { forwardRef, type ReactNode } from "react";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  tier?: "whisper" | "card" | "strong";
  glow?: boolean;
  interactive?: boolean;
  edge?: boolean;
  children: ReactNode;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(function GlassCard(
  { className, tier = "card", glow = false, interactive = false, edge = false, children, ...rest },
  ref,
) {
  const tierClass =
    tier === "whisper" ? "glass" : tier === "strong" ? "glass-strong" : "glass-card";
  return (
    <motion.div
      ref={ref}
      className={cn(
        "relative overflow-hidden rounded-3xl",
        tierClass,
        edge && "glass-edge",
        interactive && "glass-interactive",
        glow &&
          "after:pointer-events-none after:absolute after:inset-0 after:rounded-3xl after:bg-gradient-to-br after:from-[var(--accent-1)]/10 after:via-transparent after:to-[var(--accent-3)]/10",
        className,
      )}
      {...rest}
    >
      {children}
    </motion.div>
  );
});
