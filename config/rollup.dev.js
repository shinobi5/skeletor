import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
    input: 'src/app.js',
    output: {
        file: 'build/app.bundle.js',
        format: 'iife',
        sourcemap: true,
    },
    plugins: [resolve(), commonjs()],
};
