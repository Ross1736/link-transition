import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.js",
        format: "cjs",
        exports: "named",
        sourcemap: true,
      },
      {
        file: "dist/index.es.js",
        format: "es",
        exports: "named",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve({
        browser: true,
      }),
      commonjs(),
      postcss({
        modules: true,
        extract: true,
        minimize: true,
        sourceMap: true,
      }),
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: false, // ← Cambiar a false
        // Remover declarationDir
      }),
    ],
    external: ["react", "react-dom", "react/jsx-runtime", "react-router-dom"],
  },
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.d.ts",
      format: "es",
    },
    plugins: [
      dts({
        insertTypesEntry: true, // ← Añadir esto
      }),
    ],
    external: [/\.css$/, "react", "react-dom", "react-router-dom"],
  },
];
