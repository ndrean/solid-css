import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/solidcss.js"),
      name: "binyJS",
      fileName: "solidcss.js",
    },
    rollupOptions: {
      external: ["solid-js"],
    },
  },
});
