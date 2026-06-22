import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, GitFork, Github, Star, Users } from "lucide-react";
import { Reveal, SplitText } from "@/components/glass/motion-primitives";
import { getGitHubData } from "@/lib/api/github.functions";
import { profile } from "@/lib/data/profile";
import { useI18n } from "@/lib/i18n/context";

export const Route = createFileRoute("/github")({
  head: () => ({
    meta: [
      { title: "GitHub — Abdelhamed Nada" },
      {
        name: "description",
        content: "Live GitHub activity, repositories, and contribution data for @abbn7.",
      },
      { property: "og:title", content: "GitHub — Abdelhamed Nada" },
      {
        property: "og:description",
        content: "Live GitHub activity, repositories, and contribution data for @abbn7.",
      },
      { property: "og:url", content: "/github" },
    ],
    links: [{ rel: "canonical", href: "/github" }],
  }),
  component: GitHubPage,
});

function GitHubPage() {
  const { t } = useI18n();
  const fetchFn = useServerFn(getGitHubData);
  const { data, isLoading } = useQuery({
    queryKey: ["github-data"],
    queryFn: () => fetchFn(),
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

  return (
    <section className="relative px-4 pt-32 pb-20 sm:px-6 sm:pt-40">
      <div className="aurora-mesh pointer-events-none absolute inset-x-0 top-0 -z-10 h-[34rem] opacity-35" />
      <header className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_0.46fr] lg:items-end">
        <div>
          <div className="mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--text-faint)]">
            <Github size={14} /> {t("Live from GitHub", "مباشر من GitHub")} · @
            {profile.contact.githubUser}
          </div>
          <h1 className="premium-heading text-5xl sm:text-7xl">
            <SplitText text={t("Code in motion.", "كود متحرك.")} />
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-soft)]">
            {t(
              "Real activity, pulled live from the GitHub API. No vanity numbers, no editorial spin.",
              "نشاط حقيقي مسحوب مباشرة من واجهة GitHub. بلا أرقام تجميلية أو تحرير مظهري.",
            )}
          </p>
        </div>
        <Reveal delay={0.16}>
          <a
            href={profile.contact.github}
            target="_blank"
            rel="noopener"
            className="glass-strong glass-interactive glass-edge noise-overlay block rounded-[2rem] p-6"
          >
            <div className="flex items-center justify-between">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[var(--accent-1)]/30 to-[var(--accent-3)]/30">
                <Github size={20} />
              </div>
              <ExternalLink size={14} className="text-[var(--text-faint)]" />
            </div>
            <div className="mt-4 font-display text-2xl text-[var(--text)]">
              @{profile.contact.githubUser}
            </div>
            <p className="mt-2 text-sm text-[var(--text-soft)]">
              {t("Open profile and repositories", "افتح الملف والمستودعات")}
            </p>
          </a>
        </Reveal>
      </header>

      <div className="mx-auto mt-12 grid max-w-6xl gap-4 sm:grid-cols-4">
        <Stat
          icon={<Star size={14} />}
          label={t("Stars", "نجوم")}
          value={isLoading ? "—" : data?.ok ? String(data.totalStars) : "—"}
        />
        <Stat
          icon={<GitFork size={14} />}
          label={t("Public repos", "مستودعات عامة")}
          value={
            isLoading ? "—" : data?.ok && data.profile ? String(data.profile.public_repos) : "—"
          }
        />
        <Stat
          icon={<Users size={14} />}
          label={t("Followers", "متابعون")}
          value={isLoading ? "—" : data?.ok && data.profile ? String(data.profile.followers) : "—"}
        />
        <Stat
          icon={<Github size={14} />}
          label={t("Following", "يتابع")}
          value={isLoading ? "—" : data?.ok && data.profile ? String(data.profile.following) : "—"}
        />
      </div>

      {data?.ok && data.topLanguages.length > 0 && (
        <Reveal>
          <div className="mx-auto mt-10 max-w-6xl">
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--text-faint)]">
              {t("Top languages", "أكثر اللغات")}
            </div>
            <div className="glass-card glass-edge noise-overlay flex flex-wrap items-center gap-2 p-4">
              {data.topLanguages.map((l) => (
                <span key={l.name} className="glass-pill px-3 py-1 text-xs text-[var(--text-soft)]">
                  <span className="font-medium text-[var(--text)]">{l.name}</span>
                  <span className="ms-1.5 text-[var(--text-faint)]">{l.count}</span>
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      )}

      <div className="mx-auto mt-12 max-w-6xl">
        <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--text-faint)]">
          {t("Repositories", "المستودعات")}
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading &&
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="glass-card h-48 animate-pulse rounded-3xl p-5" />
            ))}
          {!isLoading &&
            data?.ok &&
            data.repos.map((r, i) => (
              <Reveal key={r.name} delay={i * 0.04}>
                <a
                  href={r.html_url}
                  target="_blank"
                  rel="noopener"
                  className="glass-card glass-interactive glass-edge noise-overlay group block h-full p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-mono text-sm font-medium text-[var(--text)] transition-colors group-hover:text-[var(--accent-1)]">
                      {r.name}
                    </h3>
                    <ExternalLink size={12} className="mt-1 text-[var(--text-faint)]" />
                  </div>
                  {r.description && (
                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-[var(--text-soft)]">
                      {r.description}
                    </p>
                  )}
                  <div className="mt-5 flex flex-wrap items-center gap-3 text-[11px] text-[var(--text-faint)]">
                    {r.language && (
                      <span className="inline-flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-[var(--accent-1)]" /> {r.language}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1">
                      <Star size={11} /> {r.stargazers_count}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <GitFork size={11} /> {r.forks_count}
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          {!isLoading && (!data?.ok || data.repos.length === 0) && (
            <div className="glass-card glass-edge noise-overlay col-span-full p-8 text-center text-sm text-[var(--text-soft)]">
              {t(
                "Live data unavailable right now. Visit GitHub directly for the latest activity.",
                "البيانات المباشرة غير متاحة حالياً. زر GitHub مباشرة لآخر النشاطات.",
              )}
              <a
                href={profile.contact.github}
                target="_blank"
                rel="noopener"
                className="ms-2 underline"
              >
                @{profile.contact.githubUser}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="glass-card glass-interactive glass-edge noise-overlay p-5">
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-[var(--text-faint)]">
        {icon} {label}
      </div>
      <div className="mt-2 font-display text-3xl font-medium text-[var(--text)]">{value}</div>
    </div>
  );
}
