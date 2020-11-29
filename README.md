# rollup-demo-module
<table>
<tr>
<th width="20%"><img src="https://i.imgur.com/cuawVSL.png"></th>
<th>
This repo provides an example <a target=”_blank” href="https://foundryvtt.com/">Foundry VTT</a> starter project using 
Rollup to bundle / create a module with best practices integrated out of the gate. Rollup is a powerful / modern bundler 
that is worth considering for your Foundry development efforts.
</th>
</tr>
<tr>
<td width="20%" valign="top"><img src="https://i.imgur.com/QBAhRiL.png"></td>
<td valign="top">
From the <a target=”_blank” href="https://rollupjs.org/guide/en/">Rollup Guide</a>: Rollup is a module bundler for 
JavaScript which compiles small pieces of code into something larger and more complex, such as a library or application. 
It uses the new standardized format for code modules included in the ES6 revision of JavaScript. ES modules let you 
freely and seamlessly combine the most useful individual functions from your favorite libraries.
<p></p>
This demo module integrates several powerful libraries that will greatly extend your development activities. Beyond
Rollup with source map generation several essential plugins for loading HTML / JSON / copying files / replacing strings 
are installed along with <a target=”_blank” href="https://postcss.org/">PostCSS</a> & 
<a target=”_blank” href="https://sass-lang.com/">Sass</a> are configured in addition to 
<a target=”_blank” href="https://www.npmjs.com/package/terser">Terser</a> and 
<a target=”_blank” href="https://www.npmjs.com/package/dotenv-safe">dotenv</a> to provide a flexible way to configure 
various deployment environments. All of the code is well commented especially the 
<a target=”_blank” href="https://github.com/typhonjs-fvtt/demo-rollup-module/blob/main/rollup.config.js">rollup.config.js</a> 
file.
<p></p>
So what does this repo / demo module do? Something right? Well... The main entry point is 
<a target=”_blank” href="https://github.com/typhonjs-fvtt/demo-rollup-module/blob/main/module/demo-rollup-module.js">demo-rollup-module.js</a>
loads an NPM module 
(<a target=”_blank” href="https://www.npmjs.com/package/ansi-colors">ansi-colors</a>) in an externally separated bundle 
and is demonstrated by console output. After Foundry has started up and is ready this module pops up a dialog showing the 
Sass styling of "Hello World" which is loaded via an HTML template and JSON file directly via Handlebars in  
<a target=”_blank” href="https://github.com/typhonjs-fvtt/demo-rollup-module/blob/main/module/src/DemoDialog.js#L1-L4">DemoDialog</a>. 
The dialog shows basic user input using async / await. A second button throws an error and outputs a stack trace w/ 
line & column numbers in the console. This is for testing source maps with the minified code verifying that one can use 
<a target=”_blank” href="https://www.npmjs.com/package/stacktracify">stacktracify</a>.
Copy the stack trace from the dev console and apply it against the source maps if you are not shipping them. Also if 
you are releasing an open source module you can verify that you can minify / mangle and still get reliable stack traces 
by shipping w/ source maps, so open the developer console and check that out too. 
<p></p>
It should be noted that importing CJS NPM modules like ansi-colors is not recommended as it is not built to run 
in the browser, but how to accomplish this task is demonstrated in addition to cleanly separating this external code
in its own bundle apart from the main module code.  
<p></p>
Installation:
<ul>
<li>Install the latest Node version</li>
<li>Run `npm install`</li>
<li>Use an IDE to run the NPM scripts</li>
</ul>
By default the module is bundled into the local `./deploy` or `./dist` directories. You can change the install path
by modifying the *.env files in the `./env` directory. While the *.env files are checked into this repo normally you 
would not do this to avoid committing local paths and any other private data your module might need.
If you are on Windows and the FoundryVTT-Data directory is located in `C:\games\FoundryVTT-Data`
then change DEPLOY_PATH to `DEPLOY_PATH=C:\games\FoundryVTT-Data\Data\modules\demo-rollup-module`.
Of course when you start on your own module replace `demo-rollup-module` with the name of the module you are developing.
<p></p>
This description doesn't cover all the details, so you are left up to explore the repo. The comments in the code and 
configuration files should provide insight. Best of luck and I hope you enjoy developing for Foundry with Rollup. I will
provide more details in time, but feel free to reach out on Discord (MLeahy#4299) or post an issue in this repo. Drop 
by <a target=”_blank” href="https://discord.gg/47ndUBqxC4">The League of 
Extraordinary Foundry developers</a> Discord or the main Foundry VTT Discord server too!   
</td>
</tr>
</table>
