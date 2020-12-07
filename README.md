![demo-rollup-module](https://i.imgur.com/aj1n1L8.png)

[![License](https://img.shields.io/badge/license-MIT-yellowgreen.svg?style=plastic)](https://github.com/typhonjs-fvtt/eslint-foundry.js/blob/main/LICENSE)

This repo provides an example [Foundry VTT](https://foundryvtt.com/) starter project using 
[Rollup](https://rollupjs.org) to bundle / create a module with best practices integrated out of the gate. Rollup is a 
powerful / modern bundler that is worth considering for your Foundry development efforts.

## Why:

Foundry VTT embraces modern Javascript / ES Modules (ESM) support, so why not choose a bundler / build tool that does so 
as well. Rollup is performant with excellent [tree-shaking](https://rollupjs.org/guide/en/#tree-shaking) support for 
delivering reduced sized modules with the latest ESM features. For a full description of this demo repo / module please 
refer to the [wiki](https://github.com/typhonjs-fvtt/demo-rollup-module/wiki). Below are the highlights.

## Highlights:

- This repo / starter module is extremely well commented in all configuration files and source code. 
- Cross platform environment variable support w/ [cross-env](https://www.npmjs.com/package/cross-env) and 
[dotenv](https://www.npmjs.com/package/dotenv-safe). Easily set custom 
[deployment paths and options](https://github.com/typhonjs-fvtt/demo-rollup-module/tree/main/env).
- Several Rollup plugin examples for loading [HTML templates](https://github.com/rollup/plugins/tree/master/packages/html) 
/ [JSON](https://github.com/rollup/plugins/tree/master/packages/json) / 
[copying files](https://www.npmjs.com/package/rollup-plugin-copy) / 
[replacing strings](https://github.com/rollup/plugins/tree/master/packages/replace).
- [PostCSS](https://postcss.org/) setup for [Sass](https://sass-lang.com/) w/ 
[autoprefixer](https://www.npmjs.com/package/autoprefixer) / 
[postcss-preset-env](https://www.npmjs.com/package/postcss-preset-env) which compiles all SCSS / Sass / CSS to 
styles.css referenced by `module.json`
- [Terser](https://www.npmjs.com/package/terser) enables optional minification / mangling with source maps support 
configured out of the box to work correctly w/ debug tooling. You can release an open source module w/ source maps and 
have confidence you can debug your module / system.
- [ESLint](https://eslint.org/) configured w/ the rules TyphonJS FVTT modules use which can be swapped out for your 
preferred setup. More importantly 
[@typhonjs-fvtt/eslint-foundry.js](https://www.npmjs.com/package/@typhonjs-fvtt/eslint-foundry.js) enables up to date 
coverage of all globals exported by [foundry.js](https://foundryvtt.com/api/foundry.js.html) and works in tandem w/ 
the [no-shadow](https://eslint.org/docs/rules/no-shadow) rule preventing overriding any core Foundry globals.
- A [Github Action](https://github.com/features/actions) which automatically prepares and formats your module with the 
release format that is required by Foundry VTT when tagging with `vX.X.X` (thanks
[Calego / ElfFriend](https://github.com/ElfFriend-DnD/) for the starter).
- Two examples of cleanly bundling NPM / Node modules separate of the main module code with a CJS example 
([ansi-colors](https://www.npmjs.com/package/ansi-colors)) and an ESM module 
([unique-names-generator](https://www.npmjs.com/package/unique-names-generator)).  

## Installation:
- Install Foundry VTT
- Install the latest Node version
- Clone this repo
- Run `npm install`
- Use an IDE to run the NPM scripts
- Change the deployment path in the `*.env` files as appropriate.

To install this module in Foundry VTT directly use the following link to the `module.json`:
- https://github.com/typhonjs-fvtt/demo-rollup-module/releases/latest/download/module.json

## Contact:
Feel free to reach out on Discord (MLeahy#4299) or post an issue in this repo. Drop by 
[The League of Extraordinary Foundry developers](https://discord.gg/47ndUBqxC4) and the main 
[Foundry VTT Discord](https://discord.gg/foundryvtt) servers too! 

For more tips and what this module actually does check out the [wiki](https://github.com/typhonjs-fvtt/demo-rollup-module/wiki). 