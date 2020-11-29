import { ansiColors }   from './externals.js'         // Imports ansi-colors from NPM / node_modules

import DemoDialog       from './src/DemoDialog.js'

const s_REPLACE_TEXT = 'THIS WILL BE REPLACED WITH - YO!';  // This text will be replaced with 'YO!'

/**
 * Shows DemoDialog when the game is ready. Please note that hooks are not asynchronous, but this is a simple demo
 * and we want to await for the dialog result. The throw the error button is meant to test stack trace reversal
 * using NPM module stacktracify - https://www.npmjs.com/package/stacktracify
 */
Hooks.once('ready', async () =>
{
   console.log(ansiColors.green('Hello world green underline from ansi-color Node module!'));

   console.log(ansiColors.green(
    `Just showing that you can do text replacement with a rollup plugin: ${s_REPLACE_TEXT}`));

   const result = await DemoDialog.show();

   console.log(ansiColors.green(`Result from dialog: ${result}`));
});

/**
 * Add window listeners to catch errors so we can print out the stack trace.
 */
window.addEventListener('error', event => { s_ERROR_HANDLER(event.error); });
window.addEventListener('unhandledrejection', event => { s_ERROR_HANDLER(event.reason); });

/**
 * Just a convenience to print out the full stack trace in order to be able to use NPM module stacktracify to
 * reverse it against a private source map.
 *
 * @param error
 */
const s_ERROR_HANDLER = (error) =>
{
   if (typeof error.stack !== 'string') { return; }

   // Only print out stack trace if it includes `demo-rollup-module`.
   if (error.stack.includes('demo-rollup-module'))
   {
      console.log(`Let's get the stack trace / use Chrome dev tools if shipping source maps or stacktracify:`);

      const lines = error.stack.split('\n');
      lines.splice(0, 1);
      console.log(lines.join('\r\n'));
   }
}