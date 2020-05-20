module.exports = {
    build: {
        basic: `"build": "npm run imagemin && npm run babel",`,
        css: `"build": "npm run css:concat && npm run css:minify && npm run imagemin && npm run babel",`,
    },
    css: {
        concat: `"css:concat": "cat src/css/settings/* src/css/global/* src/css/elements/* src/css/components/* src/css/utilities/* > src/styles.css",`,
        minify: `"css:minify": "cleancss -o src/styles.css src/styles.css",`,
        watch: `"css:watch": "onchange 'src/css/**/*' -- npm run css:concat",`,
    },
    start: {
        basic: `"start": "npm-run-all --parallel prettier:watch server:dev"`,
        css: `"start": "npm run css:concat && npm-run-all --parallel prettier:watch css:watch server:dev"`,
    },
};
