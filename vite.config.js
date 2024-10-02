import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@common": path.resolve(__dirname, "./src/modules/common"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@details": path.resolve(__dirname, "./src/modules/details"),
      "@main": path.resolve(__dirname, "./src/modules/main"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@main/context": path.resolve(__dirname, "./src/modules/main/context"),
    },
  },
  plugins: [react()],
});
