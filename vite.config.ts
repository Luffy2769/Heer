import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { fileURLToPath } from "node:url";

const isProd = process.env.NODE_ENV === "production";
const base = isProd ? "/" : "/";

export default defineConfig({
  vite: {
    base,
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    prerender: {
      enabled: true,
      crawlLinks: true,
    },
  },
  nitro: {
    entry: fileURLToPath(
      new URL(
        "node_modules/@lovable.dev/vite-tanstack-config/runtime/fetch-entry.mjs",
        import.meta.url,
      ),
    ),
    serveStatic: false,
    noExternals: true,
    inlineDynamicImports: true,
    output: {
      dir: "dist",
      serverDir: "dist/server",
      publicDir: "dist/client",
    },
    rollupConfig: {
      output: {
        entryFileNames: "server.js",
      },
    },
  },
});
