const deps = require('../../config/pkg.dependencies.js');
const scripts = require('../../config/pkg.scripts.js');

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
    const rollup = bundler && bundlerType === 'rollup';
    const webpack = bundler && bundlerType === 'webpack';
    const redux = state && stateType === 'redux';
    const beedle = state && stateType === 'beedle';

    return `{
    "name": "${projectName.toLowerCase()}",
    "description": "${description}",
    "dependencies": {
        "@babel/runtime": "${deps.babel.runtime}",
        ${beedle ? `"beedle": "${deps.beedle}",` : ''}
        ${redux ? `"redux": "${deps.redux}",` : ''}
        ${router ? `"router-component": "${deps.router}",` : ''}
        "haunted": "${deps.haunted}",
        "lit-html": "${deps.litHtml}"
    },
    "devDependencies": {
        "@babel/cli": "${deps.babel.cli}",
        "@babel/core": "${deps.babel.core}",
        "@babel/plugin-transform-runtime": "${
            deps.babel.pluginTransformRuntime
        }",
        "@babel/preset-env": "${deps.babel.presetEnv}",
        "@pika/web": "${deps.pika.web}",
        "clean-css-cli": "${deps.cleanCSSCli}",
        "colors": "${deps.colors}",
        "fs-extra": "${deps.fsExtra}",
        "glob": "${deps.glob}",
        "hankey": "${deps.hankey}",
        "husky": "${deps.husky}",
        "imagemin-cli": "${deps.imageMinCli}",
        "live-server": "${deps.liveServer}",
        "npm-run-all": "${deps.npmRunAll}",
        "onchange": "${deps.onChange}",
        "prettier": "${deps.prettier}",
        "pretty-quick": "${deps.prettyQuick}",
        ${rollup ? `"rollup": "${deps.rollup.rollup}",` : ''}
        ${rollup ? `"rollup-plugin-serve": "${deps.rollup.pluginServer}",` : ''}
        ${rollup ? `"rollup-plugin-clear": "${deps.rollup.pluginClear}",` : ''}
        ${
            rollup
                ? `"rollup-plugin-commonjs": "${deps.rollup.pluginCommonjs}",`
                : ''
        }
        ${rollup ? `"rollup-plugin-copy": "${deps.rollup.pluginCopy}",` : ''}
        ${
            rollup
                ? `"rollup-plugin-generate-html-template": "${deps.rollup.pluginGenerateHtmlTemplate}",`
                : ''
        }
        ${
            rollup
                ? `"rollup-plugin-node-resolve": "${deps.rollup.pluginNodeResolve}",`
                : ''
        }
        ${
            rollup
                ? `"rollup-plugin-terser": "${deps.rollup.pluginTerser}",`
                : ''
        }
        ${webpack ? `"webpack": "${deps.webpack.webpack}",` : ''}
        ${webpack ? `"webpack-cli": "${deps.webpack.cli}",` : ''}
        ${webpack ? `"webpack-merge": "${deps.webpack.merge}",` : ''}
        ${
            webpack
                ? `"clean-webpack-plugin": "${deps.webpack.cleanWbpackPlugin}",`
                : ''
        }
        ${
            webpack
                ? `"webpack-bundle-analyzer": "${deps.webpack.bundleAnalyzer}",`
                : ''
        }
        ${webpack ? `"webpack-dev-server": "${deps.webpack.devServer}",` : ''}
        ${
            webpack
                ? `"optimize-css-assets-webpack-plugin": "${deps.webpack.optimizeCssAssetsWebpackPlugin}",`
                : ''
        }
        ${
            webpack
                ? `"mini-css-extract-plugin": "${deps.webpack.miniCssExtractPlugin}",`
                : ''
        }
        ${
            webpack
                ? `"imagemin-webpack-plugin": "${deps.webpack.imageminWebpackPlugin}",`
                : ''
        }
        ${
            webpack
                ? `"html-webpack-plugin": "${deps.webpack.htmlWebpackPlugin}",`
                : ''
        }
        ${webpack ? `"file-loader": "${deps.webpack.fileLoader}",` : ''}
        ${webpack ? `"css-loader": "${deps.webpack.cssLoader}",` : ''}
        ${
            webpack
                ? `"copy-webpack-plugin": "${deps.webpack.copyWebpackPlugin}",`
                : ''
        }
        ${webpack ? `"babel-loader": "${deps.webpack.babelLoader}",` : ''}
        "prompts": "${deps.prompts}"
    },
    "scripts": {
        "babel": "npx babel src -d build --copy-files",
        ${
            !bundler && !css
                ? scripts.build.build
                : rollup && css
                ? scripts.build.rollupCss
                : rollup && !css
                ? scripts.build.rollup
                : webpack && css
                ? scripts.build.webpackCss
                : webpack && !css
                ? scripts.build.webpack
                : scripts.build.css
        }
        "create-component": "node scripts/create-component.js",
        "clean:modules": "rm -rf node_modules",
        "clean:build": "rm -rf build",
        ${css ? scripts.css.concat : ''}
        ${css ? scripts.css.minify : ''}
        ${css ? scripts.css.watch : ''}
        "imagemin": "imagemin --out-dir=src/img src/img/**/*.{png,jpg,gif}",
        "prepare": "pika-web --dest src/js/modules --clean --optimize",
        "prettier:watch": "onchange '**/*.js' '**/*.css' -- prettier --write {{changed}}",
        ${
            !bundler
                ? scripts.server.dev
                : rollup
                ? scripts.server.devRollup
                : scripts.server.devWebpack
        }
        "server:build": "live-server --open=build",
        "setup": "yarn && node scripts/setup.js && npx prettier --write **/*.{json,html,js} && yarn",
        ${css ? scripts.start.css : scripts.start.start}
    },
    "husky": {
        "hooks": {
          "pre-commit": "pretty-quick --staged"
        }
    }
}
`;
};
