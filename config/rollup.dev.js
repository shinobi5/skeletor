import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
// import { terser } from 'rollup-plugin-terser';

// const production = !process.env.ROLLUP_WATCH;

export default {
    input: 'src/main.js',
    output: {
        file: 'build/main.bundle.js',
        format: 'iife',
        sourcemap: true,
    },
    plugins: [
        resolve(),
        commonjs(),
        // terser(),
    ],
};
