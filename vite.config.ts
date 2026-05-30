import { defineConfig as defineLovableConfig } from "@lovable.dev/vite-tanstack-config";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig as defineViteConfig, loadEnv, mergeConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

const tanstackStartOptions = {
  server: { entry: "server" },
  importProtection: {
    behavior: "error" as const,
    client: {
      files: ["**/server/**"],
      specifiers: ["server-only"],
    },
  },
};

const isVercelBuild = process.env.VERCEL === "1";

export default isVercelBuild
  ? defineViteConfig(({ mode }) => {
      const fileEnv = loadEnv(mode, process.cwd(), "VITE_");
      const processEnv = Object.fromEntries(
        Object.entries(process.env).filter(
          (entry): entry is [string, string] => entry[0].startsWith("VITE_") && !!entry[1],
        ),
      );
      const envDefine = Object.fromEntries(
        Object.entries({ ...fileEnv, ...processEnv }).map(([key, value]) => [
          `import.meta.env.${key}`,
          JSON.stringify(value),
        ]),
      );

      return mergeConfig(
        {
          define: envDefine,
          resolve: {
            alias: { "@": `${process.cwd()}/src` },
            dedupe: [
              "react",
              "react-dom",
              "react/jsx-runtime",
              "react/jsx-dev-runtime",
              "@tanstack/react-query",
              "@tanstack/query-core",
            ],
          },
          plugins: [
            tailwindcss(),
            tsConfigPaths({ projects: ["./tsconfig.json"] }),
            tanstackStart(tanstackStartOptions),
            nitro({ preset: "vercel" }),
            viteReact(),
          ],
        },
        { server: { host: "::", port: 8080 } },
      );
    })
  : defineLovableConfig({
      tanstackStart: tanstackStartOptions,
    });
