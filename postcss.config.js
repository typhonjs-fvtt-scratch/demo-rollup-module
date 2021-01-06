const autoprefixer = require('autoprefixer');               // Adds vendor specific extensions to CSS
const postcssPresetEnv = require('postcss-preset-env');     // Popular postcss plugin for next gen CSS usage.

module.exports = {
   inject: false,                                        // Don't inject CSS into <HEAD>
   extract: `demo-rollup-module.css`,                    // Output to `styles.css` in directory of the bundle
   extensions: ['.scss', '.sass', '.css'],               // File extensions
   plugins: [autoprefixer, postcssPresetEnv],            // Postcss plugins to use
   use: ['sass']                                         // Use sass / dart-sass
};