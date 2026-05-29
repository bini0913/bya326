import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

// Vercel should use the Vite framework preset with:
// - Build command: npm run build
// - Output directory: dist
// This is a client-rendered TanStack Router SPA, so the base path must stay rooted at "/".
export default defineConfig({
  base: "/",
  plugins: [
    TanStackRouterVite({
      target: "react",
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss(),
    tsConfigPaths(),
  ],
});
