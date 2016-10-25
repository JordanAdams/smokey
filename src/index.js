const open = require('open');
const chalk = require('chalk');
const path = require('path');
const homedir = require('homedir');
const { parse: parseUrl } = require('url');
const config = require(path.join(homedir(), '.smokey-config.json'));
const { successResult, failureResult, errorResult } = require('./printer');
const smokeTest = require('./smoke-test');

const args = require('yargs')
  .usage('Usage: $0 <environment> [options]')
  .demand(1, 'Missing argument: <environment>')
    .example('$0 local', 'Test "local".')
    .example('$0 --app=foobar local', 'Test "local" in app "foobar".')
  .describe('app', 'App to test')
    .default('app', 'default')
  .describe('open', 'Open URLs in browser')
    .boolean('open')
  .help('h')
    .alias('h', 'help')
  .strict()
  .argv;

const app = config[args.app];
if (!app) {
  console.error(chalk.red(`Application not found: ${args.app}`));
  process.exit(1);
}

const environment = app.environments[args._[0]];
if (!environment) {
  console.error(chalk.red(`Environment not found: ${args._[0]}`));
  process.exit(1);
}

const endpoints = app.endpoints;
if (endpoints.length < 1) {
  console.log(chalk.yellow(`No endpoints found`));
  process.exit(1);
}

const urls = endpoints.map(endpoint => `${environment.url}${endpoint}`);

console.log('\n🐻  Only you can prevent production issues');
console.log(chalk.gray('----------------'));

smokeTest(urls, { open: args.open })
  .on('success', ({url, statusCode}) => {
    console.log(successResult(url, statusCode));
  })
  .on('failure', ({url, statusCode}) => {
    console.log(failureResult(url, statusCode));
  })
  .on('error', ({ url, error }) => {
    console.log(errorResult(url));
    console.error(error);
  });
