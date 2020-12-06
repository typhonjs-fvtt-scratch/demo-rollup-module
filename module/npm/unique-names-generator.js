import { uniqueNamesGenerator } from 'unique-names-generator';

/**
 * The reason to separate out the import of the NPM module to a separate file is so two bundles can be made with
 * Rollup in order to separate the module code / bundle from the NPM / externals bundle. See rollup.config.js for
 * details.
 *
 * Note: The benefit of using Rollup is that via tree-shaking only the main uniqueNamesGenerator code is rolled
 * into the bundle. `unique-names-generator` itself contains a bunch of superfluous default dictionaries that
 * are not imported.
 */

export default uniqueNamesGenerator;