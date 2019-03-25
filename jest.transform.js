const babelOptions = { presets: ['@babel/preset-env'] };

// Issue: https://github.com/facebook/jest/issues/1468
module.exports = require('babel-jest').createTransformer(babelOptions);