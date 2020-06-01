import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import copy from 'rollup-plugin-copy';
import htmlTemplate from 'rollup-plugin-generate-html-template';
import clear from 'rollup-plugin-clear';
import serve from 'rollup-plugin-serve';

export default {
  input: 'src/app.js',
  output: {
    file: 'build/app.bundle.js',
    format: 'iife',
    sourcemap: true,
  },
  plugins: [
    resolve(),
    commonjs(),
    clear({
      targets: ['build'],
    }),
    copy({
      targets: [
        {
          src: [
            'src/index.html',
            'src/styles.css',
            'src/service-worker.js',
            'src/manifest.json.js',
          ],
          dest: 'build',
        },
        { src: 'src/img/**/*', dest: 'build/img' },
        { src: 'src/images/**/*', dest: 'build/images' },
        { src: 'src/font/**/*', dest: 'build/font' },
        { src: 'src/fonts/**/*', dest: 'build/fonts' },
      ],
    }),
    htmlTemplate({
      template: 'src/index.html',
      target: 'index.html',
    }),
    serve({
      open: true,
      contentBase: 'build',
      port: 1234,
    }),
  ],
};
