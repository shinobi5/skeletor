import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
    input: 'src/main.js',
    output: {
        file: 'build/main.bundle.js',
        format: 'iife',
        sourcemap: true,
    },
    plugins: [resolve(), commonjs()],
};
