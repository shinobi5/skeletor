module.exports = (
    bundler,
    bundlerType,
    css,
    description,
    projectName,
    router,
    state,
    webComponents
) => {
    const serverDev = `"server:dev": "live-server --open=src",`;
    const serverDevRollup = `"server:dev": "live-server --open=src && rollup --config config/rollup.dev.js",`;
    const serverDevWebpack = `"server:dev": "webpack-dev-server --open --config config/webpack.dev.js",`;

    const build = `"build": "yarn css:concat && yarn css:minify && yarn imagemin && yarn babel",`;
    const buildRollup = `"build": "yarn css:concat && yarn css:minify && rollup --config config/rollup.prod.js",`;
    const buildWebpack = `"build": "yarn css:concat && yarn css:minify && webpack --config config/webpack.prod.js",`;

    const cssConcat = `"css:conat": "cat src/css/settings/* src/css/global/* src/css/elements/* src/css/components/* src/css/utilities/* > src/styles.css",`;
    const cssMinify = `"css:minify": "cleancss -o src/styles.css src/styles.css",`;
    const cssWatch = `"css:watch": "onchange 'src/css/**/*' -- yarn css:concat",`;

    const rollup = bundler && bundlerType === 'rollup' ? true : false;
    const webpack = bundler && bundlerType === 'webpack' ? true : false;

    return `{
    "name": "${projectName.toLowerCase()}",
    "description": "${description}",
    "dependencies": {
        ${state ? `"beedle": "^0.8.1",` : ''}
        ${webComponents ? `"haunted": "^4.5.4",` : ''}
        ${state ? `"redux": "^4.0.4",` : ''}
        ${router ? `"router-component": "^0.8.0",` : ''}
        "@babel/runtime": "^7.6.3"
    },
    "devDependencies": {
        "@babel/cli": "^7.4.4",
        "@babel/core": "^7.4.5",
        "@babel/plugin-transform-runtime": "^7.6.2",
        "@babel/preset-env": "^7.4.5",
        "@pika/web": "^0.4.3",
        "clean-css-cli": "^4.2.1",
        "colors": "^1.4.0",
        "fs-extra": "^8.0.1",
        "glob": "^7.1.3",
        "hankey": "^0.0.3",
        "husky": "^2.4.1",
        "imagemin-cli": "^4.0.1",
        "live-server": "^1.2.1",
        "npm-run-all": "^4.1.5",
        "onchange": "^5.2.0",
        "prettier": "1.18.2",
        "pretty-quick": "^1.11.0",
        ${rollup ? `"rollup": "^1.26.3",` : ''}
        ${rollup ? `"rollup-plugin-clear": "^2.0.7",` : ''}
        ${rollup ? `"rollup-plugin-commonjs": "^10.1.0",` : ''}
        ${rollup ? `"rollup-plugin-copy": "^3.1.0",` : ''}
        ${rollup ? `"rollup-plugin-generate-html-template": "^1.5.0",` : ''}
        ${rollup ? `"rollup-plugin-node-resolve": "^5.2.0",` : ''}
        ${rollup ? `"rollup-plugin-terser": "^5.1.2",` : ''}
        ${webpack ? `"webpack": "^4.41.2",` : ''}
        ${webpack ? `"webpack-bundle-analyzer": "^3.6.0",` : ''}
        ${webpack ? `"webpack-cli": "^3.3.10",` : ''}
        ${webpack ? `"webpack-dev-server": "^3.9.0",` : ''}
        ${webpack ? `"webpack-merge": "^4.2.2",` : ''}
        ${webpack ? `"optimize-css-assets-webpack-plugin": "^5.0.3",` : ''}
        ${webpack ? `"mini-css-extract-plugin": "^0.8.0",` : ''}
        ${webpack ? `"imagemin-webpack-plugin": "^2.4.2",` : ''}
        ${webpack ? `"html-webpack-plugin": "^3.2.0",` : ''}
        ${webpack ? `"file-loader": "^4.2.0",` : ''}
        ${webpack ? `"css-loader": "^3.2.0",` : ''}
        ${webpack ? `"copy-webpack-plugin": "^5.0.5",` : ''}
        ${webpack ? `"babel-loader": "^8.0.6",` : ''}
        "prompt": "^1.0.0"
    },
    "scripts": {
        "babel": "npx babel src -d build --copy-files",
        ${!bundler ? build : rollup ? buildRollup : buildWebpack}
        "clean:modules": "rm -rf node_modules",
        "clean:build": "rm -rf build",
        ${css ? cssConcat : ''}
        ${css ? cssMinify : ''}
        ${css ? cssWatch : ''}
        "imagemin": "imagemin --out-dir=src/img src/img/**/*.{png,jpg,gif}",
        "prepare": "pika-web --dest src/js/modules --clean --optimize",
        "prettier:watch": "onchange '**/*.js' '**/*.css' -- prettier --write {{changed}}",
        ${!bundler ? serverDev : rollup ? serverDevRollup : serverDevWebpack}
        "server:build": "live-server --open=build",
        "setup": "node scripts/setup.js",
        "start": "yarn css:concat && npm-run-all --parallel prettier:watch css:watch server:dev"
    },
    "husky": {
        "hooks": {
          "pre-commit": "pretty-quick --staged"
        }
    }
}
`;
};
