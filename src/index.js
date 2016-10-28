const open = require('open');
const chalk = require('chalk');
const { exec } = require('child_process');
const config = require('./config');
const { result } = require('./output');
const smokeTest = require('./smoke-test');
const args = require('./args');

if (args.edit) {
  exec(`$EDITOR ${config.__configPath}`);
}

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
if (!endpoints.length) {
  console.log(chalk.yellow('No endpoints found'));
  process.exit(1);
}

const urls = endpoints.map((endpoint) => `${environment.url}${endpoint}`);

console.log('\n🐻  Only you can prevent production issues');
console.log(chalk.gray('----------------'));

smokeTest(urls)
  .on('success', ({url, statusCode}) => {
    console.log(result.success(url, statusCode));
  })
  .on('failure', ({url, statusCode}) => {
    console.log(result.failure(url, statusCode));
  })
  .on('error', ({ url, error }) => {
    console.log(result.error(url));
    console.error(error);
  });

if (args.open) {
  urls.forEach(url => open(url));
}
