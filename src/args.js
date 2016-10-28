const yargs = require('yargs')
  .usage('Usage: $0 <environment> [options]')
    .example('$0 local', 'Test "local".')
    .example('$0 --app=foobar local', 'Test "local" in app "foobar".')
  .describe('app', 'App to test')
    .alias('app', 'a')
    .default('app', 'default')
  .describe('open', 'Open URLs in browser')
    .alias('open', 'o')
    .boolean('open')
  .describe('edit', 'Edit your smokey config')
    .alias('edit', 'e')
    .boolean('edit')
  .help('h')
    .alias('h', 'help')
  .strict();

const args = yargs.argv;

if (args._.length < 1 && !args.edit) {
  yargs.showHelp();
  console.error('Missing argument: <environment>');
}

module.exports = args;
