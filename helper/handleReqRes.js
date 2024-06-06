const url = require('url');
const { StringDecoder } = require('string_decoder');
const route = require('../route');
const { notFoundHandler } = require('../handler/routeHandler/notFoundHandler');
const { jsonParse } = require('../helper/utilities');

const helper = {};
helper.handleReqRes = (req, res) => {
    // Request handle
    const parsedUrl = url.parse(req.url, true);
    const pathName = parsedUrl.pathname;
    const trimPath = pathName.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryString = parsedUrl.query;
    const header = req.headers;

    const requestProperties = {
        parsedUrl,
        pathName,
        trimPath,
        method,
        queryString,
        header
    };

    const decoder = new StringDecoder('utf-8');
    let realData = '';

    const chosenHandler = route[trimPath] ? route[trimPath] : notFoundHandler;

    let responseSent = false;

    const sendResponse = (statusCode, payload) => {
        if (!responseSent) {
            statusCode = typeof(statusCode) === 'number' ? statusCode : 500;
            payload = typeof(payload) === 'object' ? payload : {};

            const payloadString = JSON.stringify(payload);
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);
            responseSent = true;
        }
    };

    req.on('data', (buffer) => {
        realData += decoder.write(buffer);
    });

    req.on('end', () => {
        realData += decoder.end();
        requestProperties.body = jsonParse(realData);

        chosenHandler(requestProperties, sendResponse);
    });
};

module.exports = helper;