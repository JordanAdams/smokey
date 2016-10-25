const chalk = require('chalk');
const { parse: parseUrl, format: formatUrl } = require('url');

const renderResultUrl = (url) => {
  const { protocol, auth, host, path, hash } = parseUrl(url);

  return [
    chalk.gray(formatUrl({ protocol, auth, host })),
    `${path}${hash}`
  ].join('');
};

const result = (url, statusText) => {
  return [
    statusText,
    chalk.gray(' - '),
    renderResultUrl(url)
  ].join('');
}

const successResult = (url, status) => {
  const statusText = chalk.green(`✔︎ ${status}`);

  return result(url, statusText);
};

const failureResult = (url, status) => {
  const statusText = chalk.red(`✘ ${status}`);

  return result(url, statusText)
};

const errorResult = (url) => {
  return failureResult(url, 'ERR');
};

module.exports = {
  successResult,
  failureResult,
  errorResult
};
