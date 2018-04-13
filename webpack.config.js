'use strict';
var webpack = require('webpack');

var config = {
    context: __dirname, // `__dirname` is root of project and `src` is source
    entry: {
        bundle: './js/index.js',
    },
    output: {
        path: __dirname + '/dist', // `dist` is the destination
        filename: 'bundle.js'
    },
    plugins: [
        /* prevent that webpack loads momentjs-support for all languages. Only DE and EN.
         * see http://stackoverflow.com/questions/25384360/how-to-prevent-moment-js-from-loading-locales-with-webpack
         */
        new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(de|en)$/),
    ],
    module: {
        rules: [{
            test: /node_modules[\\\/]vis[\\\/].*\.js$/, // vis.js files
            loader: 'babel-loader',
            query: {
                cacheDirectory: true,
                presets: [ "babel-preset-es2015" ].map(require.resolve),
                plugins: [
                    "transform-es3-property-literals", // see https://github.com/almende/vis/pull/2452
                    "transform-es3-member-expression-literals", // see https://github.com/almende/vis/pull/2566
                    "transform-runtime" // see https://github.com/almende/vis/pull/2566
                ]
            }
        }, {
            test: /\.js$/, //Check for all js files
            loader: 'babel-loader',
            query: {
                presets: [ "babel-preset-es2015" ].map(require.resolve)
            }
        }, {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }, {
            test: /.*\.png$/i,
            loaders: [ 'file-loader', {
                loader: 'image-webpack-loader',
                query: {
                    progressive: true,
                    pngquant: {
                        quality: '65-90',
                        speed: 4
                    }
                }
            }
            ]
        }
        ]
    },
    //To run development server
    devServer: {
        contentBase: __dirname,
    },

    devtool: "eval-source-map" // Default development sourcemap
};

module.exports = config;