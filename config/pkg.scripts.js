module.exports = {
    build: {
        basic: `"build": "npm run imagemin && npm run babel",`,
        rollup: `"build": "rollup --config config/rollup.prod.js",`,
        webpack: `"build": "webpack --config config/webpack.prod.js",`,
        css: `"build": "npm run css:concat && npm run css:minify && npm run imagemin && npm run babel",`,
        rollupCss: `"build": "npm run css:concat && npm run css:minify && rollup --config config/rollup.prod.js",`,
        webpackCss: `"build": "npm run css:concat && npm run css:minify && webpack --config config/webpack.prod.js",`,
    },
    css: {
        concat: `"css:concat": "cat src/css/settings/* src/css/global/* src/css/elements/* src/css/components/* src/css/utilities/* > src/styles.css",`,
        minify: `"css:minify": "cleancss -o src/styles.css src/styles.css",`,
        watch: `"css:watch": "onchange 'src/css/**/*' -- npm run css:concat",`,
    },
    server: {
        dev: `"server:dev": "live-server --open=src",`,
        devRollup: `"server:dev": "rollup --config config/rollup.dev.js",`,
        devWebpack: `"server:dev": "webpack-dev-server --open --config config/webpack.dev.js",`,
    },
    start: {
        basic: `"start": "npm-run-all --parallel prettier:watch server:dev"`,
        css: `"start": "npm run css:concat && npm-run-all --parallel prettier:watch css:watch server:dev"`,
    },
};
