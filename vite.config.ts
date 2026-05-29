// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare/nitro (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const isVercel = process.env.VERCEL === "1";

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
// Vercel deploys TanStack Start through Nitro; the Lovable wrapper otherwise only enables
// Nitro in Lovable sandboxes, so force the Vercel preset when a Vercel build is detected.
export default defineConfig({
  // `nitro` is accepted at runtime by the Lovable wrapper but not yet in its public types.
  ...({
    nitro: isVercel
      ? {
          preset: "vercel",
          output: {
            dir: ".vercel/output",
            publicDir: ".vercel/output/static",
            serverDir: ".vercel/output/functions/__server.func",
          },
        }
      : true,
  } as Record<string, unknown>),
  tanstackStart: {
    server: { entry: "server" },
  },
});
