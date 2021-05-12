/* eslint-disable */
import vue from 'rollup-plugin-vue';
import postcss from 'rollup-plugin-postcss';
import typescript from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import pkg from './package.json';

const fs = require('fs');
const path = require('path');

const readdirSync = (p, a = []) => {
  if (fs.statSync(p).isDirectory()) {
    a.pop(); // remove directory path
    fs.readdirSync(p).map((f) => readdirSync(a[a.push(path.join(p, f)) - 1], a));
  } else {
    if (p.endsWith('.d.ts')) a.pop();
  }
  return a;
};
const srcDir = './src';
const srcFiles = readdirSync(srcDir);
console.log(srcFiles);

// ESM/UMD/IIFE shared settings: externals
// Refer to https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency
// Should be added as peerDependencies in package.json
const external = [
  // list external dependencies, exactly the way it is written in the import statement.
  // eg. 'jquery'
  'vue',
  // 'vue-property-decorator',
  // 'vue-class-component',
];

// UMD/IIFE shared settings: output.globals
// Refer to https://rollupjs.org/guide/en#output-globals for details
const globals = {
  // Provide global variable names to replace your external imports
  // eg. jquery: '$'
  vue: pkg.libName,
};

export default [
  // ESM build to be used with webpack/rollup and tree shakeable.
  {
    input: srcFiles,
    output: {
      format: 'esm',
      dir: 'dist/lib',
      entryFileNames: (info) => path
          .join(path.dirname(info.facadeModuleId), `${info.name}.js`)
          .replace(path.join(path.dirname(__filename), srcDir, path.sep), ''),
    },
    external: external,
    plugins: [
      nodeResolve(),
      typescript({
        tsconfigOverride: { compilerOptions: { declaration: true } }
      }),
      vue({
        css: false,
        template: {
          isProduction: true,
        },
      }),
      postcss({ extract: 'style.css' }),
    ],
  },

  // ESM build.
  {
    input: 'src/index.ts',
    output: {
      format: 'esm',
      file: 'dist/index.esm.js',
      exports: 'named',
    },
    external: external,
    plugins: [
      nodeResolve(),
      typescript({
        tsconfigOverride: { compilerOptions: { declaration: false } }
      }),
      vue({ template: { optimizeSSR: true } }),
      postcss({ extract: 'style.css' }),
    ],
  },

  // SSR build.
  {
    input: 'src/index.ts',
    output: {
      format: 'cjs',
      file: 'dist/index.ssr.js',
      name: pkg.libName,
    },
    external: external,
    plugins: [
      nodeResolve(),
      typescript({
        tsconfigOverride: { compilerOptions: { declaration: false } }
      }),
      vue({ template: { optimizeSSR: true } }),
      postcss({ extract: 'style.css' }),
    ],
  },

  // Browser build.
  {
    input: 'src/index.ts',
    output: {
      compact: true,
      format: 'iife',
      file: 'dist/index.min.js',
      name: pkg.libName,
      globals: globals,
    },
    external: external,
    plugins: [
      nodeResolve(),
      typescript({
        tsconfigOverride: { compilerOptions: { declaration: false } }
      }),
      vue(), 
      postcss({ extract: 'style.css' })
    ],
  },
];
