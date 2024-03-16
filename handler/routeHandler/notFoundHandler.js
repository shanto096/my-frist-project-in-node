const handler = {}

handler.notFoundHandler = (requestProperties, callBack) => {
    callBack(404, {
        message: 'not found '
    })
    console.log('notFound');
}

module.exports = handler