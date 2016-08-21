var webpack = require('webpack');
var VendorChunkPlugin = require('webpack-vendor-chunk-plugin');

module.exports = {
    entry: {
        recipe: "./app/js/RecipeEditor.tsx",
        calendar: "./app/js/CalendarEditor.tsx",
        vendor: ['react', 'react-dom', 'react-bootstrap', 'whatwg-fetch', 'immutable', 'es6-promise', 'jquery', 'jquery-serializejson', 'bootstrap']
    },
    output: {
        filename: "../resources/static/js/[name].bundle.js",
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            // chunks: ['bundle1'],
            filename: '../resources/static/js/vendor.js',
            minChunks: Infinity
        }),
        new VendorChunkPlugin('vendor'),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
    ],

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            { test: /\.tsx?$/, loader: "ts-loader" },
            { test: /vendor\/.+\.(jsx|js|ts|tsx)$/,
                loader: 'imports?jQuery=jquery,$=jquery,this=>window'
            }
        ],

        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        // "jquery": "$"
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    },
}