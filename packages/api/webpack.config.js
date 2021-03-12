const path = require('path');

const mode = process.env.NODE_ENV || 'production';

module.exports = {
    target: 'webworker',
    entry: path.join(__dirname, 'index.ts'),
    output: {
        filename: `worker.${mode}.js`,
        path: path.join(__dirname, 'dist'),
    },
    mode,
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                    configFile: path.join(__dirname, 'tsconfig.json'),
                },
            },
        ],
    },
};
