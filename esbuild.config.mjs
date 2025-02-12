import { build } from 'esbuild';

build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  outfile: 'dist/index.js',
  platform: 'browser',
  target: 'esnext',
  sourcemap: false,
  format: 'esm',
}).catch(() => process.exit(1));
