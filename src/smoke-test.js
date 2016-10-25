const EventEmitter = require('events');
const request = require('request-promise');
const openUrl = require('open');

const statusOk = (status) => (status >= 100 && status <= 399);

const testRequest = emitter => url => {
  request(url, { simple: false, resolveWithFullResponse: true })
    .then(({statusCode}) => {
      statusOk(statusCode)
        ? emitter.emit('success', { url, statusCode })
        : emitter.emit('failure', { url, statusCode });
    })
    .catch(error => {
      emitter.emit('error', { url, error });
      console.error(error);
      process.exit(1);
    })
}

module.exports = (urls, opts) => {
  const emitter = new EventEmitter();
  const options = Object.assign({}, {
    open: false
  }, opts);

  if (options.open) {
    urls.forEach(openUrl)
  }

  urls.forEach(testRequest(emitter))

  return emitter;
};
