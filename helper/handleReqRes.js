const url = require('url')
const { StringDecoder } = require('string_decoder')
const route = require('../route')
const { notFoundHandler } = require('../handler/routeHandler/notFoundHandler')
const { jsonParse } = require('../helper/utilities')

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



    req.on('data', (buffer) => {
        realData += decoder.write(buffer)
    })
    req.on('end', () => {
        realData += decoder.end()
        requestProperties.body = jsonParse(realData)
            // console.log(requestProperties.body);
        chosenHandler(requestProperties, (statsCode, payload) => {
                statsCode = typeof(statsCode) === 'number' ? statsCode : 500;
                payload = typeof(payload) === 'object' ? payload : {}

                const payloadString = JSON.stringify(payload)
                res.setHeader('Content-type', 'application/json')
                res.writeHead(statsCode)
                res.end(payloadString)
            })
            // Response handle>>>>>>>>>
        res.end('ami achi tomar sathe')
    })


}
module.exports = helper