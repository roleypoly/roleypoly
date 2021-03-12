const path = require('path');
const { getLoader, loaderByName } = require('@craco/craco');

const includePaths = [
    path.join(__dirname, '../design-system'),
    path.join(__dirname, '../../src/common'),
];

module.exports = {
    webpack: {
        alias: {},
        plugins: [],
        configure: (webpackConfig, { env, paths }) => {
            const { isFound, match } = getLoader(
                webpackConfig,
                loaderByName('babel-loader')
            );
            if (isFound) {
                const include = Array.isArray(match.loader.include)
                    ? match.loader.include
                    : [match.loader.include];
                match.loader.include = [...include, ...includePaths];
            }
            return webpackConfig;
        },
    },
};
