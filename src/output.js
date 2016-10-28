const chalk = require('chalk');
const { parse: parseUrl, format: formatUrl } = require('url');

const output = {
  result: {
    _create: (rawUrl, status) => {
      const url = output.result._url(rawUrl);

      return `${status}  ${url}`;
    },

    _url: (url) => {
      const { protocol, auth, host, path, hash } = parseUrl(url);
      const base = formatUrl({ protocol, auth, host });
      const end = [path, hash].join('');

      return chalk.gray(base) + end;
    },

    success: (url, status) => {
      const statusText = chalk.green(`✔︎ ${status}`);

      return output.result._create(url, statusText);
    },

    failure: (url, status) => {
      const statusText = chalk.red(`✘ ${status}`);

      return output.result._create(url, statusText);
    },

    error: (url) => {
      return output.result.failure(url, 'ERR');
    }
  }
};

module.exports = output;
