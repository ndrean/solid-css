import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/bau-solidcss.js"),
      name: "bau-solidcss",
      fileName: "bau-solidcss.js",
    },
    rollupOptions: {
      external: ["solid-js", "solid-js/web"],
    },
  },
});
