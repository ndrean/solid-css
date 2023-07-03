import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig(({ command, mode, ssrBuild }) => {
  return {
    build: {
      lib: {
        entry: resolve(__dirname, "bau-solidcss.js"),
        name: "BauSolidCss",
        fileName: "bau-solidcss.js",
      },
    },
    server: {
      open: true,
    },
  };
});
