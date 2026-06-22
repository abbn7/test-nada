import { motion } from "framer-motion";
import { Gauge, Gem, ScanSearch } from "lucide-react";
import { Reveal } from "@/components/glass/motion-primitives";
import { useI18n } from "@/lib/i18n/context";

const PRINCIPLES = [
  {
    icon: Gauge,
    en: {
      kicker: "Performance",
      title: "Built for speed.",
      body: "Every byte and every render path is intentional. No bloat, no jank, no visual noise that slows the message down.",
      metric: "Fast UX",
    },
    ar: {
      kicker: "الأداء",
      title: "بُني للسرعة.",
      body: "كل بايت وكل دورة عرض مقصودة. لا حشو، لا تأخير، ولا ضوضاء بصرية تبطئ الرسالة.",
      metric: "تجربة سريعة",
    },
  },
  {
    icon: ScanSearch,
    en: {
      kicker: "Clarity",
      title: "Designed to be understood.",
      body: "Information hierarchy first. Every section answers what I do, why it matters, and how to take action.",
      metric: "Clear path",
    },
    ar: {
      kicker: "الوضوح",
      title: "صُمم ليُفهم.",
      body: "هرمية المعلومات أولاً. كل قسم يجيب ماذا أفعل، لماذا يهم، وكيف تبدأ الخطوة التالية.",
      metric: "مسار واضح",
    },
  },
  {
    icon: Gem,
    en: {
      kicker: "Craft",
      title: "Pixel-grade execution.",
      body: "Spacing, typography, motion, RTL, and dark/light balance are engineered with the same rigor as the code.",
      metric: "Premium feel",
    },
    ar: {
      kicker: "الحرفية",
      title: "تنفيذ بمستوى البكسل.",
      body: "المسافات والطباعة والحركة وRTL وتوازن الوضعين مصممة بنفس صرامة الكود.",
      metric: "إحساس فاخر",
    },
  },
] as const;

export function PrinciplesGrid() {
  const { lang } = useI18n();
  return (
    <section className="section-shell liquid-section">
      <div className="container-premium">
        <div className="mb-10 grid gap-4 sm:grid-cols-[1fr_0.7fr] sm:items-end">
          <Reveal>
            <div>
              <div className="eyebrow mb-3">
                {lang === "ar" ? "معايير التنفيذ" : "Execution principles"}
              </div>
              <h2 className="premium-heading text-4xl sm:text-5xl">
                {lang === "ar"
                  ? "واجهة تثبت الجودة قبل الكلام."
                  : "Quality you can feel before you read."}
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-sm leading-relaxed text-[var(--text-soft)] sm:text-end">
              {lang === "ar"
                ? "تم تطوير كل طبقة لتنافس بورتفوليوهات المطورين الممتازة: رسالة أسرع، دليل أوضح، وحركة أهدأ."
                : "Every layer is tuned to compete with premium developer portfolios: faster message, clearer proof, calmer motion."}
            </p>
          </Reveal>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {PRINCIPLES.map((p, i) => {
            const content = lang === "ar" ? p.ar : p.en;
            const Icon = p.icon;
            return (
              <Reveal key={content.kicker} delay={i * 0.08}>
                <motion.div
                  className="glass-card glass-interactive glass-edge noise-overlay group relative h-full overflow-hidden p-7"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[var(--accent-1)]/0 via-transparent to-[var(--accent-3)]/0 opacity-0 transition-opacity duration-700 group-hover:from-[var(--accent-1)]/10 group-hover:to-[var(--accent-3)]/10 group-hover:opacity-100" />
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[var(--accent-1)]/25 to-[var(--accent-3)]/25 text-[var(--text)]">
                      <Icon size={19} />
                    </div>
                    <span className="glass-pill px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-[var(--text-faint)]">
                      {content.metric}
                    </span>
                  </div>
                  <div className="mb-4 text-[10px] font-semibold uppercase tracking-[0.32em] text-[var(--text-faint)]">
                    {content.kicker}
                  </div>
                  <h3 className="font-display text-2xl font-medium leading-tight text-[var(--text)]">
                    {content.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-soft)]">
                    {content.body}
                  </p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
