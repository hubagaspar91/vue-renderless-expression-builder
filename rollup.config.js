import typescript from 'rollup-plugin-typescript2';
import vue from 'rollup-plugin-vue';
import babel from 'rollup-plugin-babel';
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";

import pkg from './package.json';

export default {
  input: 'src/main.ts',
  output: [
    {
      file: pkg.main,
      format: 'esm',
    }
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ],
  plugins: [
    typescript({
      "typescript": require('typescript')
    }),
    resolve(),
    commonjs({
      include: "node_modules/**"
    }),
    babel({
      include: 'src/**/*',
      extensions: ['.js', '.ts'],
      babelrc: false,
      configFile: false,
      presets: [
        "@babel/env"
      ],
      plugins: [
        ["@babel/transform-runtime", {helpers: true, corejs: false, version: "^7.9.0"}]
      ],
      runtimeHelpers: true
    }),
    vue()
  ]
}