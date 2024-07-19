import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import react from "@vitejs/plugin-react";
import nodeResolve from "@rollup/plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";
import terser from "@rollup/plugin-terser";

export default defineConfig({
  base: "./",
  plugins: [nodeResolve(), react(), external(), dts({ rollupTypes: true }), terser()],
  esbuild: {
    drop: ["console", "debugger"],
  },
  build: {
    sourcemap: true,
    lib: {
      entry: [resolve(__dirname, "src/index.ts"), resolve(__dirname, "src/react.ts")],
      name: "eventracker",
      fileName: (format, entryName) => (format === "cjs" ? `${entryName}.cjs` : `${entryName}.js`),
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["react", "react-dom"],

      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
