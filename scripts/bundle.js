import { rollup } from 'rollup';
import babel from 'rollup-plugin-babel';

rollup({
    entry: 'src/index.js',
    plugins: [
        babel({
            exclude: 'node_modules/**',
        }),
    ],
}).then(bundle => {
    bundle.write({
        dest: 'build/index.js',
        format: 'esm',
    });
});
