import uniqueNamesGenerator   from '../npm/unique-names-generator.js';  // Import the npm module

import dialogHTML             from '../templates/dialog.html';       // You can import strings w/ rollup-plugin-string
import firstName              from '../json/elf-names-first.json';   // You can import JSON w/ @rollup/plugin-json
import lastName               from '../json/elf-names-last.json';    // First and last elf names are loaded.

import '../sass/dialog.scss';                                        // Import the scss file so Rollup picks it up.

/**
 * Basic dialog extension w/ static show method.
 *
 * A random elven name is generated with the NPM module `unique-name-generator` with the provided first / last names
 * in `elf-names-first.json` and `elf-names-last.json` and inserted into a basic HTML template via Handlebars.
 *
 * Take note of the id passed in at the tail end of the dialog creation as this provides an id attribute to target
 * CSS specific for the dialog.
 */
export default class DemoDialog extends Dialog
{
   /**
    * @param {Object} data               An object of dialog data which configures how the modal window is rendered
    * @param {Object} options            Dialog rendering options
    */
   constructor(data, options)
   {
      super(data, options);
   }

   /**
    * This is where you would add any custom listener code in your dialog.
    *
    * @param {jQuery} html - HTML content of the dialog.
    *
    * @override
    */
   activateListeners(html)
   {
      super.activateListeners(html);
   }

   /**
    * Convenience method to show dialog and return a Promise resolved when the button is clicked.
    *
    * @returns {Promise<unknown>}
    */
   static async show()
   {
      // Create a random `elven` name from the JSON dictionaries provided using the NPM module `unique-names-generator`.
      const randomName = uniqueNamesGenerator({ dictionaries: [firstName, lastName], separator: ' ' });

      return new Promise((resolve) =>
      {
         new DemoDialog({
            'title': 'Demo Rollup Dialog',
            'content': Handlebars.compile(dialogHTML)({ randomName }), // Use Handlebars to construct the message w/ the
            'buttons': {                                               // random name generated.
               ok: {
                  label: "Ok",
                  callback: async () =>
                  {
                     resolve(`Dialog OK clicked`);                   // Pass back a message via the promise.
                  }
               },
               error: {
                  label: "Throw Error",
                  callback: async () =>
                  {
                     throw new Error('Error to test stack trace of minified code.');
                  }
               }
            },
            'default': "ok"
         }, { id: `DemoRollupDialog` }).render(true);  // Take note of passing in the `id` here as `DemoRollupDialog`
      });                                             // is used as the id in the HTML div tag for the app / dialog.
   }                                                  // Any Application you create can use the id attribute to target
}                                                     // CSS output. See `dialog.scss` for an example.