import { Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle, Mail } from "lucide-react";
import { Reveal } from "@/components/glass/motion-primitives";
import { profile, whatsappUrl } from "@/lib/data/profile";
import { useI18n } from "@/lib/i18n/context";

export function ContactCta() {
  const { lang, t } = useI18n();
  return (
    <section className="section-shell">
      <Reveal>
        <div className="glass-strong glass-edge noise-overlay relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] p-8 sm:p-14">
          <div className="aurora-mesh absolute inset-0 -z-10 opacity-60" />
          <div className="eyebrow mb-3">{t("Let's build", "هيا نبني")}</div>
          <h2 className="premium-heading text-4xl sm:text-6xl">
            {t("Have an idea worth shipping?", "عندك فكرة تستحق التنفيذ؟")}
          </h2>
          <p className="mt-5 max-w-2xl text-balance text-base text-[var(--text-soft)] sm:text-lg">
            {t(
              "I'm taking on a limited number of remote and freelance engagements. Tell me what you're building — I read every message.",
              "أتعامل مع عدد محدود من المشاريع عن بُعد والمستقلة. احكي لي عن مشروعك — أقرأ كل رسالة بنفسي.",
            )}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--text)] px-6 py-3 text-sm font-medium text-[var(--bg)] transition-all hover:scale-[1.03] active:scale-[0.97]"
            >
              {t("Start the conversation", "ابدأ الحوار")}
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
              />
            </Link>
            <a
              href={whatsappUrl(lang)}
              target="_blank"
              rel="noopener"
              className="glass glass-interactive inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-[var(--text)]"
            >
              <MessageCircle size={14} /> WhatsApp
            </a>
            <a
              href={`mailto:${profile.contact.email}`}
              className="glass glass-interactive inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-[var(--text)]"
            >
              <Mail size={14} /> {t("Email", "البريد")}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
