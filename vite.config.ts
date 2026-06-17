// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// When deploying outside Lovable (e.g. Vercel via `git push`), force nitro on
// with the Vercel preset so SSR/server functions build correctly. Lovable
// sandbox builds still override this and force the Cloudflare preset.
export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  nitro: { preset: process.env.NITRO_PRESET ?? "vercel" },
});
