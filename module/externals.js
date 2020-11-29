import ansiColors  from 'ansi-colors'         // Imports ansi-colors from NPM / node_modules

/**
 * The reason to separate out the import of the NPM module to a separate file is that so two bundles can be made with
 * Rollup in order to separate the module code / bundle from the NPM / externals bundle. See rollup.config.js for
 * details.
 */

export { ansiColors };