// all require>>>>>>>>>>>>

const http = require('http')
const url = require('url')

const app = {}

app.config = {
    port: 3000
}


app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.port, () => {
        console.log(`listen in the port ${app.config.port}`)
    })
}


app.handleReqRes = (req, res) => {
    // request handle>>>>>>>>>>>>>
    const parsedUrl = url.parse(req.url, true)

    const pathName = parsedUrl.pathname
    const trimPath = pathName.replace(/^\/+|\/+$/g, '')
    const method = req.method.toLowerCase()
    const queryString = parsedUrl.query
    const header = req.headers

    // Response handle>>>>>>>>>
    res.end('ami achi tomar sathe')
}

app.createServer()