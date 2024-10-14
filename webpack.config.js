const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    // amd: undefined,
    // bail: undefined,
    // cache: undefined,
    // context: undefined,
    // dependencies: undefined,
    devServer: {
        open: true, // open default browser
        host: 'localhost',
        //onBeforeSetupMiddleware: (app) => { // IS DEPRECATED for webpack 5.0
            // app.app.get("/", function(req, res){
            //     res.json({})
            // })

            // app.post("/post/some-data", bodyParser.json(), function(req, res){
            //     res.send("POST res sent from webpack dev server")
            // })
        //},
        // allowedHosts: undefined,
        // bonjour: undefined,
        // client: undefined,
        // compress: undefined,
        // devMiddleware: {
        //     index: true,
        //     mimeTypes: { phtml: 'text/html' },
        //     publicPath: '/dist',
        //     serverSideRender: true,
        //     writeToDisk: true,
        // },
        // headers: undefined,
        // historyApiFallback: true,
        // hot: undefined,
        // ipc: undefined,
        // liveReload: undefined,
        // onListening: undefined,
        // port: 80,
        // proxy: undefined,
        // server: undefined,
        // setupExitSignals: undefined,
        // setupMiddlewares: undefined,
        // static: {directory: path.join(__dirname, '/')},
        // watchFiles: undefined,
        // webSocketServer: undefined,
    },
    // devtool: undefined,
    entry: path.resolve(__dirname, 'src/index.tsx'),
    // entry: {
    //     home: './home.js',
    //     shared: ['react', 'react-dom', 'redux', 'react-redux'],
    //     catalog: {
    //         import: './catalog.js',
    //         filename: 'pages/catalog.js',
    //         dependOn: 'shared',
    //         chunkLoading: false, // Disable chunks that are loaded on demand and put everything in the main chunk.
    //     },
    //     personal: {
    //         import: './personal.js',
    //         filename: 'pages/personal.js',
    //         dependOn: 'shared',
    //         chunkLoading: 'jsonp',
    //         asyncChunks: true, // Create async chunks that are loaded on demand.
    //         layer: 'name of layer', // set the layer for an entry point
    //     },
    // },
    // experiments: undefined,
    // extends: undefined,
    // externals: undefined,
    // externalsPresets: undefined,
    // externalsType: undefined,
    // ignoreWarnings: undefined,
    // infrastructureLogging: undefined,
    // loader: undefined,
    mode: isProduction ? 'production' : 'development',
    module: {
        // defaultRules: undefined,
        // exprContextCritical: undefined,
        // exprContextRecursive: undefined,
        // exprContextRegExp: undefined,
        // exprContextRequest: undefined,
        // generator: undefined,
        // noParse: undefined,
        // parser: undefined,
        rules: [
            {
                test: /\.(tsx?)$/i,
                loader: 'ts-loader',
                exclude: [
                    path.resolve(__dirname, 'node_modules'),
                ],
                options: {
                    compilerOptions: {
                        noEmit: false,
                    },
                },
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.svg$/i,
                type: 'asset/source',
            },
        ],
        // strictExportPresence: undefined,
        // strictThisContextOnImports: undefined,
        // unknownContextCritical: undefined,
        // unknownContextRecursive: undefined,
        // unknownContextRegExp: undefined,
        // unknownContextRequest: undefined,
        // unsafeCache: undefined,
        // wrappedContextCritical: undefined,
        // wrappedContextRecursive: undefined,
        // wrappedContextRegExp: undefined,
    },
    // name: undefined,
    // node: undefined,
    // optimization: undefined,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    // parallelism: undefined,
    // performance: undefined,
    plugins: [new HtmlWebpackPlugin()],
    // profile: undefined,
    // recordsInputPath: undefined,
    // recordsOutputPath: undefined,
    // recordsPath: undefined,
    resolve: {
        // alias: {}, // Create aliases to import or require certain modules more easily
        // aliasFields: ['browser'], // Specify a field, such as browser, to be parsed according to this specification https://github.com/defunctzombie/package-browser-field-spec
        // byDependency: { // Configure resolve options by the type of module request
        //     esm: {mainFields: ['browser']},
        //     commonjs: {aliasFields: ['module']},
        //     url: {preferRelative: false}
        // },
        // cache: true, // Enables caching of successfully resolved requests, allowing cache entries to be revalidated
        // cachePredicate: ({path, request}) => false, // A function which decides whether a request should be cached or not
        // cacheWithContext: false, // If unsafe cache is enabled, includes request.context in the cache key
        // conditionNames: ['require', 'node'], // Condition names for exports field which defines entry points of a package
        // descriptionFiles: ['package.json'], // The JSON files to use for descriptions
        // enforceExtension: false, // If true, it will not allow extension-less files
        // exportsFields: ['exports', 'myCompanyExports'], // Fields in package.json that are used for resolving module requests
        extensions: ['.tsx', '.ts', '.jsx', '.js'], // Attempt to resolve these extensions in order. Use '...' to access the default extensions. JS is important to resolve node_modules!
        // extensionAlias: {'.js': ['.ts', '.js']}, // An object which maps extension to extension aliases
        // fallback: { // Redirect module requests when normal resolving fails
        //     abc: false, // do not include a polyfill for abc,
        //     xyz: path.resolve(__dirname, 'path/to/file.js'), // include a polyfill for xyz
        //     assert: require.resolve('assert'),
        //     buffer: require.resolve('buffer'),
        //     console: require.resolve('console-browserify'),
        //     constants: require.resolve('constants-browserify'),
        //     crypto: require.resolve('crypto-browserify'),
        //     domain: require.resolve('domain-browser'),
        //     events: require.resolve('events'),
        //     http: require.resolve('stream-http'),
        //     https: require.resolve('https-browserify'),
        //     os: require.resolve('os-browserify/browser'),
        //     path: require.resolve('path-browserify'),
        //     punycode: require.resolve('punycode'),
        //     process: require.resolve('process/browser'),
        //     querystring: require.resolve('querystring-es3'),
        //     stream: require.resolve('stream-browserify'),
        //     string_decoder: require.resolve('string_decoder'),
        //     sys: require.resolve('util'),
        //     timers: require.resolve('timers-browserify'),
        //     tty: require.resolve('tty-browserify'),
        //     url: require.resolve('url'),
        //     util: require.resolve('util'),
        //     vm: require.resolve('vm-browserify'),
        //     zlib: require.resolve('browserify-zlib'),
        // },
        // fileSystem: ???,
        // fullySpecified: true, // treats user-specified requests as fully specified
        // importsFields: ['browser', 'module', 'main'], // Fields from package.json which are used to provide the internal requests of a package
        // mainFields: ['browser', 'module', 'main'], // When importing from an npm package, this option will determine which fields in its package.json are checked
        // mainFiles: ['index'], // The filename to be used while resolving directories
        modules: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules')], // Tell webpack what directories should be searched when resolving modules
        // plugins: [], // A list of additional resolve plugins which should be applied
        // preferAbsolute: false, // Prefer absolute paths to resolve.roots when resolving
        // preferRelative: true, // When enabled, webpack would prefer to resolve module requests as relative requests instead of using modules from node_modules directories
        // resolver: ???,
        // restrictions: [/\.(sass|scss|css)$/], // A list of resolve restrictions to restrict the paths that a request can be resolved on
        roots: [__dirname], // A list of directories where requests of server-relative URLs (starting with '/') are resolved
        // symlinks: true, // Whether to resolve symlinks to their symlinked location. May cause module resolution to fail when using tools that symlink packages (like npm link)
        // unsafeCache: /src\/utilities/, // Enable aggressive, but unsafe, caching of modules. Passing true will cache everything, a regular expression, or an array can be used to cache certain modules
        // useSyncFileSystemCalls: true, // Use synchronous filesystem calls for the resolver
    },
    // resolveLoader: { // set of options is identical to the resolve property set above, but is used only to resolve webpack's loader packages
    //     modules: ['node_modules'],
    //     extensions: ['.js', '.json'],
    //     mainFields: ['loader', 'main'],
    //     ...
    // },
    // context: path.resolve(__dirname, 'src'), // The base directory, an absolute path, for resolving entry points and loaders from the configuration
    // snapshot: undefined,
    // stats: undefined,
    // target: undefined,
    // watch: undefined,
    // watchOptions: undefined,
}
