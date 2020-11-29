import autoprefixer     from 'autoprefixer'                 // Adds vendor specific extensions to CSS
import postcssPresetEnv from 'postcss-preset-env'           // Popular postcss plugin for next gen CSS usage.

export default (sourceMap = false) => {
   return {
      inject: false,                                        // Don't inject CSS into <HEAD>
      extract: `styles.css`,                                // Output to `styles.css` in directory of the bundle
      extensions: ['.scss', '.sass', '.css'],               // File extensions
      plugins: [autoprefixer, postcssPresetEnv],            // Postcss plugins to use
      sourceMap,                                            // Generate sourcemaps
      use: ['sass'],                                        // Use sass / dart-sass
   }
}