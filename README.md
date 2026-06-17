# Abdelhamed Nada — Liquid Glass Portfolio

Personal portfolio built on **TanStack Start v1** (React 19 + Vite 7 + Tailwind v4), with R3F, Framer Motion, and a glass-first design system. Ships with SSR, live GitHub data, AR/EN i18n, and full SEO.

---

## 1. Local Development

```bash
bun install      # or: npm install / pnpm install
bun run dev      # http://localhost:5173
bun run build    # production build (Vercel preset)
```

> Node 20+ recommended. The project works with `bun`, `npm`, `pnpm`, or `yarn`.

---

## 2. Push to a new GitHub repo

```bash
git init
git add .
git commit -m "Initial commit — portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

---

## 3. One-Click Deploy on Vercel

1. Go to **https://vercel.com/new** and import the GitHub repo you just created.
2. Vercel will auto-detect Vite. **Leave all settings on default** — no env vars are required for v1.
   - Framework Preset: `Vite` (auto)
   - Build Command: `vite build` (auto from `package.json`)
   - Output: handled by the Nitro **Vercel preset** baked into `vite.config.ts`
3. Click **Deploy**. Done.

### Optional environment variables

| Variable | Purpose |
|---|---|
| `GITHUB_TOKEN` | Lifts GitHub API rate-limits on `/github` page (no scopes required — a fine-grained PAT with public read is enough). |

Add it under **Project → Settings → Environment Variables** and redeploy.

---

## 4. Project structure (short version)

```
src/
  routes/                  TanStack file-based routes (index, about, work, work.$slug, skills, github, contact, dev)
  components/              glass primitives, hero (R3F), layout (nav, footer, aurora, intro)
  lib/
    data/profile.ts        all real content from the CV
    i18n/context.tsx       EN/AR + RTL
    api/github.functions.ts  live GitHub API server fn
    api/contact.functions.ts contact-form server fn
  styles.css               Tailwind v4 + glass tokens + aurora
vite.config.ts             Nitro preset = vercel
```

---

## 5. Custom domain

After the first deploy, add your domain under **Vercel → Project → Settings → Domains**. Vercel will issue HTTPS automatically.

---

## License

Personal portfolio — © Abdelhamed Nada.
