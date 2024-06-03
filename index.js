// all require>>>>>>>>>>>>

const http = require('http')
const { handleReqRes } = require('./helper/handleReqRes')
const environment = require('./helper/environment')
const lib = require('./lib/data')

const app = {}

app.config = {
    port: 3000
}

lib.create('test', 'newFile', { 'name': 'shanto' }, (err) => {
    console.log(err);
})

app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.port, () => {
        console.log(`listen in the port ${app.config.port}`)
    })
}


app.handleReqRes = handleReqRes

app.createServer()