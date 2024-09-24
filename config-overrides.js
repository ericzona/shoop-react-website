const webpack = require('webpack');

module.exports = function override(config) {
  // This section sets up fallbacks for Node.js modules that Webpack 5 no longer polyfills automatically.
  // These mappings tell Webpack where to find the browser-compatible versions of these modules.
  config.resolve.fallback = {
    ...config.resolve.fallback,
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    buffer: require.resolve('buffer/'),
    process: require.resolve('process/browser.js'), // Polyfills 'process' for browser usage
    vm: require.resolve('vm-browserify'),
    zlib: require.resolve('browserify-zlib'),
    util: require.resolve('util/'),
  };

  // Adding aliases to resolve specific modules that Webpack is having trouble with.
  // The alias explicitly maps 'process/browser' to the correct path.
  config.resolve.alias = {
    ...config.resolve.alias,
    'process/browser': require.resolve('process/browser.js'), // Ensure Axios and other packages can resolve 'process/browser'
  };

  // Adding plugins to provide polyfills globally, making Buffer and process available throughout the application.
  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'], // Polyfills Buffer globally in the app
      process: 'process/browser',   // Polyfills process globally
    }),
  ];

  // This section adds a rule to handle source maps, specifically ignoring problematic libraries
  // that don't provide proper source maps, to prevent warnings during compilation.
  config.module.rules.push({
    test: /\.js$/,
    enforce: 'pre',
    use: ['source-map-loader'],
    exclude: [
      /node_modules\/@solana\/buffer-layout/,
      /node_modules\/superstruct/,
    ],
  });

  // Return the modified configuration back to Webpack
  return config;
};
