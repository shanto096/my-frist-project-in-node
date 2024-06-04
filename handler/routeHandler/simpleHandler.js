const handler = {}

handler.simpleHandler = (requestProperties, callBack) => {
    callBack(200, {
        message: 'ami simple'
    })

}

module.exports = handler