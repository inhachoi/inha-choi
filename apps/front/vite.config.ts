import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    tanstackStart({
      spa: { enabled: true },
      router: {
        entry: "./app/router",
        routesDirectory: "./app/routes",
        generatedRouteTree: "./app/routeTree.gen.ts",
      },
      client: {
        entry: "./main",
      },
    }),
    react(),
    svgr(),
  ],

  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },

  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
});
