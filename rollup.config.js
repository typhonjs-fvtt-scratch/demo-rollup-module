import fs               from 'fs'
import path             from 'path'

// The following plugins are for the main source bundle.

import copy             from 'rollup-plugin-copy'           // Copies files
import json             from '@rollup/plugin-json'          // Allows import of JSON; used in dialog Handlebars content.
import postcss          from 'rollup-plugin-postcss'        // Process Sass / CSS w/ PostCSS
import replace          from '@rollup/plugin-replace'       // Replaces text in processed source files.
import { string }       from 'rollup-plugin-string'         // Allows loading strings as ES6 modules.

// The following plugins are for the 2nd external bundle pulling in ansi-colors from NPM.

import commonjs         from '@rollup/plugin-commonjs'      // This converts ansi-colors to ES6 from CJS.
import globals          from 'rollup-plugin-node-globals'   // This is necessary as ansi-colors references `process.env`.
import resolve          from '@rollup/plugin-node-resolve'  // This resolves ansi-colors from node_modules.

// Terser is used as an output plugin in both bundles to conditionally minify / mangle the output bundles depending
// on which NPM script & .env file is referenced.

import { terser }       from 'rollup-plugin-terser'         // Terser is used for minification / mangling

// Import config files for Terser and Postcss; refer to respective documentation for more information.
import terserConfig     from './terser.config';
import postcssOptions   from './postcss.config'
// const postcssOptions = require('./OLDOLDOLDpostcss.config');

export default commandLineArgs => {

   // Load the .env file specified in the command line target into process.env using `dotenv-safe`
   // This is a very convenient and cross platform way to handle environment variables. Please note that the .env
   // files are committed to this repo, but in your module you should uncomment the `**.env` directive in `.gitignore`
   // so that .env files are not committed into your repo. The difference between `dotenv-safe` and `dotenv` is that
   // the former provides a template providing a sanity check for imported .env files to make sure all required
   // parameters are present. This template is located in `./env/.env.example` and can be checked into your repo.

   // There are two environment variables loaded from .env files.
   // process.env.DEPLOY_PATH is the full path for your platform to the destination of your module / bundled code.
   // process.env.DEPLOY_MINIFY specifies if the bundled code should be minified.

   // process.env.TARGET is defined in package.json NPM scripts using the `cross-env` NPM module passing it into
   // running this script. It defines which .env file to use below.
   require('dotenv-safe').config({
      example: `${__dirname}${path.sep}env${path.sep}.env.example`,
      path: `${__dirname}${path.sep}env${path.sep}${process.env.TARGET}.env`
   });

   // Sanity check to make sure parent directory of DEPLOY_PATH exists.
   if (!fs.existsSync(path.dirname(process.env.DEPLOY_PATH)))
   {
      throw Error('DEPLOY_PATH does not exist: ' + process.env.DEPLOY_PATH)
   }

   // Reverse relative path from the deploy path to local directory; used to replace source maps path.
   const relativePath = path.relative(process.env.DEPLOY_PATH, '.');

   // Defines potential output plugins to use conditionally if the .env file indicates the bundles should be
   // minified / mangled.
   const outputPlugins = [];
   if (process.env.DEPLOY_MINIFY === 'true')
   {
      outputPlugins.push(terser(terserConfig))
   }

   // Defines whether source maps are generated / loaded from the .env file.
   const sourcemap = process.env.DEPLOY_SOURCEMAPS === 'true';

   // Shortcuts
   const DIR = process.env.DEPLOY_PATH;
   const PS = path.sep;

   console.log(`Bundling target: ${process.env.TARGET}`)

   return [{
      input: `module${PS}demo-rollup-module.js`,
      external: [ './externals.js' ],                       // Suppresses the warning and excludes ansi-colors from the
      output: {                                             // main bundle.
         file: `${DIR}${PS}demo-rollup-module.js`,
         format: 'es',
         plugins: outputPlugins,
         sourcemap,
         sourcemapPathTransform: sourcePath => sourcePath.replace(relativePath, `.`)
      },
      plugins: [
         postcss(postcssOptions(sourcemap)),
         json(),                                            // Allows import of JSON; used in dialog Handlebars content.
         string({ include: ["**/*.css", "**/*.html"] }),    // Allows loading strings as ES6 modules; HTML and CSS.
         replace({                                          // Replaces text in processed source files.
            'THIS WILL BE REPLACED WITH - YO!': 'YO!',      // This replacement is located in demo-rollup-module.js
            delimiters: ['', '']
         })
      ]
   },

   // The external inclusions from NPM is separated into a 2nd bundle. This keeps the main source bundle of your module
   // clean. In this case we are just importing `ansi-colors` from NPM. Note that since it is a CJS module that
   // `@rollup/plugin-commonjs` is used to convert it to ES6 and `rollup-plugin-node-globals` injects dummy
   // `process.env` and other globals found in the Node environment as they are referenced by `ansi-colors`.
   // `ansi-colors` isn't really a good module to import as it is not intended to use in the browser neither is `chalk`
   // which was what was requested in the League developers Discord which is even more heavyweight w/ dependencies that
   // bloat the code of a bundle. This is just an example and not recommended regarding use of `ansi-colors`.
   // Ideally you will be importing NPM modules which are built to run on Node and the browser and also potentially
   // include ES6 source code. !! Remove this in your own module !!
   {
      input: `module${PS}externals.js`,
      output: {
         file: `${DIR}${PS}externals.js`,
         format: 'es',
         plugins: outputPlugins,
         sourcemap,
         sourcemapPathTransform: sourcePath => sourcePath.replace(relativePath, `.`)
      },
      plugins: [
         resolve({ browser: true }),                  // This resolves ansi-colors from NPM / node_modules.
         commonjs(),                                  // This is necessary to convert ansi-colors to ES6 from CJS.
         globals(),                                   // This is necessary as ansi-colors references `process.env`.
      ]
   },

   // This is just an example of chaining another action. In this case `empty.js` is a dummy input and the module.json
   // and icons are copied to the destination directory. You could easily add this to the main / first bundle action
   // above, but it's good to know you can point to an empty file to separate actions. You'll use the `copy` plugin
   // to copy over any assets, packs or even bare source code depending on your module.
   {
      input: 'empty.js',
      plugins: [
         copy({ targets: [
            { src: `module/module.json`, dest: DIR },       // Copies module.json to destination.
            { src: `module/icons/*`, dest: `${DIR}/icons` } // Copies icon directory to destination.
         ]}),
      ]
   }];
}
