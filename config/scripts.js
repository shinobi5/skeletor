module.exports = {
    build: {
        build: `"build": "yarn imagemin && yarn babel",`,
        rollup: `"build": "rollup --config config/rollup.prod.js",`,
        webpack: `"build": "webpack --config config/webpack.prod.js",`,
        css: `"build": "yarn css:concat && yarn css:minify && yarn imagemin && yarn babel",`,
        rollupCss: `"build": "yarn css:concat && yarn css:minify && rollup --config config/rollup.prod.js",`,
        webpackCss: `"build": "yarn css:concat && yarn css:minify && webpack --config config/webpack.prod.js",`,
    },
    css: {
        concat: `"css:concat": "cat src/css/settings/* src/css/global/* src/css/elements/* src/css/components/* src/css/utilities/* > src/styles.css",`,
        minify: `"css:minify": "cleancss -o src/styles.css src/styles.css",`,
        watch: `"css:watch": "onchange 'src/css/**/*' -- yarn css:concat",`,
    },
    server: {
        dev: `"server:dev": "live-server --open=src",`,
        devRollup: `"server:dev": "rollup --config config/rollup.dev.js",`,
        devWebpack: `"server:dev": "webpack-dev-server --open --config config/webpack.dev.js",`,
    },
    start: {
        start: `"start": "npm-run-all --parallel prettier:watch server:dev"`,
        css: `"start": "yarn css:concat && npm-run-all --parallel prettier:watch css:watch server:dev"`,
    },
};
