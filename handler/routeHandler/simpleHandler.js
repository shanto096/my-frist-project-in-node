const handler = {}

handler.simpleHandler = (requestProperties, callBack) => {
    callBack(200, {
        message: 'ami simple'
    })
    console.log(requestProperties);
}

module.exports = handler