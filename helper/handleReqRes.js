const url = require('url')
const { StringDecoder } = require('string_decoder')
const route = require('../route')
const { notFoundHandler } = require('../handler/routeHandler/notFoundHandler')

const helper = {}
helper.handleReqRes = (req, res) => {
    // request handle>>>>>>>>>>>>>
    const parsedUrl = url.parse(req.url, true)
    const pathName = parsedUrl.pathname
    const trimPath = pathName.replace(/^\/+|\/+$/g, '')
    const method = req.method.toLowerCase()
    const queryString = parsedUrl.query
    const header = req.headers

    const requestProperties = {
        parsedUrl,
        pathName,
        trimPath,
        method,
        queryString,
        header
    }

    const decoder = new StringDecoder('utf-8')
    let realData = '';

    const chosenHandler = route[trimPath] ? route[trimPath] : notFoundHandler;

    chosenHandler(requestProperties, (statusCode, payload) => {
        statusCode = typeof(statusCode) === 'number' ? statusCode : 500;
        payload = typeof(payload) === 'object' ? payload : {};
        const payloadString = JSON.stringify(payload)

        res.writeHead(statusCode)
        res.end(payloadString)

    })

    req.on('data', (buffer) => {
        realData += decoder.write(buffer)
    })
    req.on('end', () => {
        realData += decoder.end()

        console.log(realData);
        // Response handle>>>>>>>>>
        res.end('ami achi tomar sathe')
    })


}
module.exports = helper