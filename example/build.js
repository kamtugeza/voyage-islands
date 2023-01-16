const autoprefixer = require('autoprefixer');
const { sassPlugin } = require('esbuild-sass-plugin');
const glob = require('glob');
const postcss = require('postcss');

require('esbuild').build({
  bundle: true,
  entryPoints: glob.sync('./src/*.{ts,scss}'),
  format: 'esm',
  outdir: './dist',
  plugins: [
    sassPlugin({
      async transform(source) {
          const { css } = await postcss([ autoprefixer ])
              .process(source, { from: undefined });
          return css;
      },
    })
  ],
  watch: process.argv.includes('--watch'),
}).catch(() => process.exit(1));
