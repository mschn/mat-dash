import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_URL || "/",
  server: {
    proxy: {
      "/rpc": "http://localhost:3000",
      "/ical-proxy": {
        target: "https://calendar.google.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ical-proxy/, "/calendar/ical"),
      },
    },
  },
});
