import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/nannies-app/",
  build: {
    outDir: "dist",
  },
});