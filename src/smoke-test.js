const EventEmitter = require('events');
const request = require('request-promise');

const statusOk = (status) => (status >= 100 && status <= 399);

const testRequest = (emitter, url) => {
  request(url, { simple: false, resolveWithFullResponse: true })
    .then(({statusCode}) => {
      statusOk(statusCode)
        ? emitter.emit('success', { url, statusCode })
        : emitter.emit('failure', { url, statusCode });
    })
    .catch((error) => {
      emitter.emit('error', { url, error });
    });
};

module.exports = (urls) => {
  const emitter = new EventEmitter();
  urls.forEach(url => testRequest(emitter, url));
  return emitter;
};
