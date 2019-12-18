const dependencies = require('../../config/dependencies.js/index.js');

module.exports = (
    bundler,
    bundlerType,
    css,
    description,
    projectName,
    router,
    state,
    stateType
) => {
    const cssConcat = `"css:concat": "cat src/css/settings/* src/css/global/* src/css/elements/* src/css/components/* src/css/utilities/* > src/styles.css",`;
    const cssMinify = `"css:minify": "cleancss -o src/styles.css src/styles.css",`;
    const cssWatch = `"css:watch": "onchange 'src/css/**/*' -- yarn css:concat",`;

    const serverDev = `"server:dev": "live-server --open=src",`;
    const serverDevRollup = `"server:dev": "rollup --config config/rollup.dev.js",`;
    const serverDevWebpack = `"server:dev": "webpack-dev-server --open --config config/webpack.dev.js",`;

    const build = `"build": "yarn imagemin && yarn babel",`;
    const buildRollup = `"build": "rollup --config config/rollup.prod.js",`;
    const buildWebpack = `"build": "webpack --config config/webpack.prod.js",`;
    const buildCSS = `"build": "yarn css:concat && yarn css:minify && yarn imagemin && yarn babel",`;
    const buildRollupCSS = `"build": "yarn css:concat && yarn css:minify && rollup --config config/rollup.prod.js",`;
    const buildWebpackCSS = `"build": "yarn css:concat && yarn css:minify && webpack --config config/webpack.prod.js",`;

    const start = `"start": "npm-run-all --parallel prettier:watch server:dev"`;
    const startCSS = `"start": "yarn css:concat && npm-run-all --parallel prettier:watch css:watch server:dev"`;

    const rollup = bundler && bundlerType === 'rollup';
    const webpack = bundler && bundlerType === 'webpack';
    const redux = state && stateType === 'redux';
    const beedle = state && stateType === 'beedle';

    return `{
    "name": "${projectName.toLowerCase()}",
    "description": "${description}",
    "dependencies": {
        "@babel/runtime": "${dependencies.babelRuntime}",
        ${beedle ? `"beedle": "${dependencies.beedle}",` : ''}
        ${redux ? `"redux": "${dependencies.redux}",` : ''}
        ${router ? `"router-component": "${dependencies.router}",` : ''}
        "haunted": "${dependencies.haunted}",
        "lit-html": "${dependencies.litHtml}"
    },
    "devDependencies": {
        "@babel/cli": "${dependencies.dev.babel.cli}",
        "@babel/core": "${dependencies.dev.babel.core}",
        "@babel/plugin-transform-runtime": "${
            dependencies.dev.babel.pluginTransformRuntime
        }",
        "@babel/preset-env": "${dependencies.dev.babel.presetEnv}",
        "@pika/web": "${dependencies.dev.pika.web}",
        "clean-css-cli": "${dependencies.dev.cleanCSSCli}",
        "colors": "${dependencies.dev.colors}",
        "fs-extra": "${dependencies.dev.fsExtra}",
        "glob": "${dependencies.dev.glob}",
        "hankey": "${dependencies.dev.hankey}",
        "husky": "${dependencies.dev.husky}",
        "imagemin-cli": "${dependencies.dev.imageMinCli}",
        "live-server": "${dependencies.dev.liveServer}",
        "npm-run-all": "${dependencies.dev.npmRunAll}",
        "onchange": "${dependencies.dev.onChange}",
        "prettier": "${dependencies.dev.prettier}",
        "pretty-quick": "${dependencies.dev.prettyQuick}",
        ${rollup ? `"rollup": "${dependencies.dev.rollup.rollup}",` : ''}
        ${
            rollup
                ? `"rollup-plugin-serve": "${dependencies.dev.rollup.pluginServer}",`
                : ''
        }
        ${
            rollup
                ? `"rollup-plugin-clear": "${dependencies.dev.rollup.pluginClear}",`
                : ''
        }
        ${
            rollup
                ? `"rollup-plugin-commonjs": "${dependencies.dev.rollup.pluginCommonjs}",`
                : ''
        }
        ${
            rollup
                ? `"rollup-plugin-copy": "${dependencies.dev.rollup.pluginCopy}",`
                : ''
        }
        ${
            rollup
                ? `"rollup-plugin-generate-html-template": "${dependencies.dev.rollup.pluginGenerateHtmlTemplate}",`
                : ''
        }
        ${
            rollup
                ? `"rollup-plugin-node-resolve": "${dependencies.dev.rollup.pluginNodeResolve}",`
                : ''
        }
        ${
            rollup
                ? `"rollup-plugin-terser": "${dependencies.dev.rollup.pluginTerser}",`
                : ''
        }
        ${webpack ? `"webpack": "${dependencies.dev.webpack.webpack}",` : ''}
        ${webpack ? `"webpack-cli": "${dependencies.dev.webpack.cli}",` : ''}
        ${
            webpack
                ? `"webpack-merge": "${dependencies.dev.webpack.merge}",`
                : ''
        }
        ${
            webpack
                ? `"clean-webpack-plugin": "${dependencies.dev.webpack.cleanWbpackPlugin}",`
                : ''
        }
        ${
            webpack
                ? `"webpack-bundle-analyzer": "${dependencies.dev.webpack.bundleAnalyzer}",`
                : ''
        }
        ${
            webpack
                ? `"webpack-dev-server": "${dependencies.dev.webpack.devServer}",`
                : ''
        }
        ${
            webpack
                ? `"optimize-css-assets-webpack-plugin": "${dependencies.dev.webpack.optimizeCssAssetsWebpackPlugin}",`
                : ''
        }
        ${
            webpack
                ? `"mini-css-extract-plugin": "${dependencies.dev.webpack.miniCssExtractPlugin}",`
                : ''
        }
        ${
            webpack
                ? `"imagemin-webpack-plugin": "${dependencies.dev.webpack.imageminWebpackPlugin}",`
                : ''
        }
        ${
            webpack
                ? `"html-webpack-plugin": "${dependencies.dev.webpack.htmlWebpackPlugin}",`
                : ''
        }
        ${
            webpack
                ? `"file-loader": "${dependencies.dev.webpack.fileLoader}",`
                : ''
        }
        ${
            webpack
                ? `"css-loader": "${dependencies.dev.webpack.cssLoader}",`
                : ''
        }
        ${
            webpack
                ? `"copy-webpack-plugin": "${dependencies.dev.webpack.copyWebpackPlugin}",`
                : ''
        }
        ${
            webpack
                ? `"babel-loader": "${dependencies.dev.webpack.babelLoader}",`
                : ''
        }
        "prompt": "${dependencies.dev.prompt}"
    },
    "scripts": {
        "babel": "npx babel src -d build --copy-files",
        ${
            !bundler && !css
                ? build
                : rollup && css
                ? buildRollupCSS
                : rollup && !css
                ? buildRollup
                : webpack && css
                ? buildWebpackCSS
                : webpack && !css
                ? buildWebpack
                : buildCSS
        }
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
        "setup": "yarn && node scripts/setup.js && npx prettier --write **/*.{json,html,js} && yarn",
        ${css ? startCSS : start}
    },
    "husky": {
        "hooks": {
          "pre-commit": "pretty-quick --staged"
        }
    }
}
`;
};
