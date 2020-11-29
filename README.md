# demo-rollup-module
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
<a target=”_blank” href="https://sass-lang.com/">Sass</a> configured out of the box to output all processed CSS to 
`styles.css` during the build process which is subsequently referenced by 
<a target=”_blank” href="https://github.com/typhonjs-fvtt/demo-rollup-module/blob/main/module/module.json">module.json</a>. 
In addition, <a target=”_blank” href="https://www.npmjs.com/package/terser">Terser</a> is setup for conditional 
minification / mangling and <a target=”_blank” href="https://www.npmjs.com/package/dotenv-safe">dotenv</a> provides a 
flexible way to configure various deployment environments. All of the code is well commented especially the 
<a target=”_blank” href="https://github.com/typhonjs-fvtt/demo-rollup-module/blob/main/rollup.config.js">rollup.config.js</a> 
file.
<p></p>
So what does this repo / demo module do? Something right? Well... The main entry point  
<a target=”_blank” href="https://github.com/typhonjs-fvtt/demo-rollup-module/blob/main/module/demo-rollup-module.js">demo-rollup-module.js</a>
loads an NPM module 
(<a target=”_blank” href="https://www.npmjs.com/package/ansi-colors">ansi-colors</a>) in an externally separated bundle 
and is demonstrated by console output. After Foundry has started up and is ready this module pops up a dialog showing the 
<a target=”_blank” href="https://github.com/typhonjs-fvtt/demo-rollup-module/blob/main/module/sass/dialog.scss">Sass styling</a> 
of "Hello World" which is loaded via an 
<a target=”_blank” href="https://github.com/typhonjs-fvtt/demo-rollup-module/blob/main/module/templates/dialog.html">HTML template</a> 
and <a target=”_blank” href="https://github.com/typhonjs-fvtt/demo-rollup-module/blob/main/module/json/dialog.json">JSON file</a> 
directly via Handlebars in   
<a target=”_blank” href="https://github.com/typhonjs-fvtt/demo-rollup-module/blob/main/module/src/DemoDialog.js#L1-L4">DemoDialog</a>. 
This provides a second way to load templates and differs from the standard way to load a template with the Foundry 
client code via <a target=”_blank” href="https://foundryvtt.com/api/global.html#renderTemplate">renderTemplate</a>. The 
dialog shows basic user input using async / await. A second button throws an error and outputs a stack trace w/ 
line & column numbers in the console. This is for testing source maps with the minified code verifying that one can use 
<a target=”_blank” href="https://www.npmjs.com/package/stacktracify">stacktracify</a>.
Copy the stack trace from the dev console and apply it against the source maps if you are not shipping them. Also if 
you are releasing an open source module you can verify that you can minify / mangle and still get reliable stack traces 
by shipping w/ source maps, so open the developer console and check that out too. 
<p></p>
It should be noted that importing CJS NPM modules like ansi-colors is not recommended as it is not built to run 
in the browser, but how to accomplish this task is demonstrated in addition to cleanly separating this external code
in its own bundle apart from the main module code. Ideally you'll import an ES6 NPM module and just use the 
`@rollup/plugin-node-resolve` plugin.
<p></p>
What does this all mean; where is the power in this developer setup? What makes Rollup so great for Foundry 
development and application deployment in general is its 
<a target=”_blank” href="https://rollupjs.org/guide/en/#tree-shaking">tree-shaking</a> capability. Through static 
analysis Rollup just pulls in the code that is accessed in your project. This includes Sass / CSS files and source code.   
Configuration of Rollup is really flexible and concise allowing simple to more involved build pipelines with many 
plugins that already accomplish common and not so common tasks let alone integration possibilities with PostCSS that 
brings a whole library of CSS related transformation plugins into play. I personally find the configuration as code 
approach Rollup takes to be intuitive and the best way currently to supercharge deployment. 
<p></p>
Setup steps for `demo-rollup-module`:
<ul>
    <li>Install Foundry VTT</li>
    <li>Install the latest Node version</li>
    <li>Clone this repo</li>
    <li>Run `npm install`</li>
    <li>Use an IDE to run the NPM scripts</li>
    <li>Change the deployment path in the *.env files as appropriate</li>
</ul>
By default the module is bundled into the local `./deploy` or `./dist` directories. You can change the deploy path
by modifying the *.env files in the `./env` directory. While the *.env files are checked into this repo normally you 
would not do this to avoid committing local paths and any other private data your module might need. So remove the 
line indicated in `.gitignore` for your own module. If you are on Windows and the FoundryVTT-Data directory is located 
in `C:\games\FoundryVTT-Data` then change DEPLOY_PATH to 
`DEPLOY_PATH=C:\games\FoundryVTT-Data\Data\modules\demo-rollup-module`. Run the relevant NPM script to deploy the module 
for local testing. Make sure to restart Foundry the first time deploying locally. Of course when you start on your own 
module replace `demo-rollup-module` with the name of the module you are developing.
<p></p>
Do reference the essential Foundry <a target=”_blank” href="https://foundryvtt.com/article/module-development/">module 
development article</a>. Also reference the <a target=”_blank” href="https://foundryvtt.com/api/">Foundry client API docs</a>.
Ultimately you need to get familiar with `foundry.js` which is the core client code your module runs in and the interactions 
with your chosen game system such as <a target=”_blank” href="https://gitlab.com/foundrynet/dnd5e">D&D5e</a>, but there are 
many others being developed as well. You can find the `foundry.js` file in the `./FoundryVTT/resources/app/public/scripts` 
directory under your main Foundry installation. If you think you have found a bug or just have an idea for a useful 
feature enhancement to the core Foundry code open an 
<a target=”_blank” href="https://gitlab.com/foundrynet/foundryvtt/-/issues">issue on the main tracker</a>. 
<p></p>
A very useful tip if you are using an IDE like JetBrains WebStorm is to add the public foundry scripts directory as
a second content root to your project. This will enable intelligent code completion for `foundry.js` and can greatly
aid your understanding of Foundry. Also add the system that you are using such as `dnd5e` (found in 
`./FoundryVTT-Data/Data/systems/dnd5e`) as a third content root and automatic code completion will be enabled for it as 
well. Here is a <a target=”_blank” href="https://i.imgur.com/31vHCeP.png">link showing </a> where to enable additional 
content roots in WebStorm.
<p></p>
The description above doesn't cover all the details for Foundry development and using this repo as a starter project, 
so you are left up to your own to explore the repo for now. However, this is a ton more information than I had when I 
got started with Foundry module development a month ago (Oct '20). The comments in the code and configuration files 
should provide insight. This is the essential build & development process for all my "TyphonJS FVTT" modules forthcoming. 
Best of luck and I hope you enjoy developing for Foundry with Rollup too. I will provide more details in time, but feel 
free to reach out on Discord (MLeahy#4299) or post an issue in this repo. Drop by 
<a target=”_blank” href="https://discord.gg/47ndUBqxC4">The League of Extraordinary Foundry developers</a> and the main 
<a target=”_blank” href="https://discord.gg/foundryvtt">Foundry VTT Discord</a> servers too!   
</td>
</tr>
</table>
