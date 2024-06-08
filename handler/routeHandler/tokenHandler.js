const lib = require('../../lib/data')
const { hash, createToken } = require('../../helper/utilities')
const { jsonParse } = require('../../helper/utilities')


const handler = {}

handler.tokenHandler = (requestProperties, callBack) => {
    const acceptedMethod = ['get', 'post', 'put', 'delete']
    if (acceptedMethod.indexOf(requestProperties.method) > -1) {
        handler._token[requestProperties.method](requestProperties, callBack)
    } else {
        callBack(405)
    }

}

//request handling ....................
handler._token = {}
handler._token.post = (requestProperties, callBack) => {

    const phone = typeof(requestProperties.body.phone === 'string') && requestProperties.body.phone.trim().length > 0 ? requestProperties.body.phone : false
    const passwords = typeof(requestProperties.body.passwords === 'string') && requestProperties.body.passwords.trim().length > 0 ? requestProperties.body.passwords : false
    if (phone && passwords) {
        lib.read('user', phone, (uData, err1) => {
            const hashedPassword = hash(passwords)
            if (hashedPassword === jsonParse(uData).password) {
                const tokenId = createToken(20)
                const expire = Date.now() + 60 * 60 * 1000;

                const tokenObject = {
                    phone,
                    id: tokenId,
                    expire
                }
                lib.create('token', tokenId, tokenObject, (err2) => {
                    if (!err2) {
                        callBack(200, tokenObject)
                    } else {
                        callBack(500, {
                            message: 'There was a problem server side '
                        })
                    }
                })
            } else {
                callBack(500, {
                    message: 'There was a problem server side '
                })
            }
        })
    } else {
        callBack(400, {
            message: 'There was a problem request'
        })
    }




}
handler._token.get = (requestProperties, callBack) => {
    const phone = requestProperties.queryString.phone;


};


handler._token.put = (requestProperties, callBack) => {
    const firstName = typeof(requestProperties.body.firstName === 'string') && requestProperties.body.firstName.trim().length > 0 ? requestProperties.body.firstName : false
    const lastName = typeof(requestProperties.body.lastName === 'string') && requestProperties.body.lastName.trim().length > 0 ? requestProperties.body.lastName : false
    const phone = typeof(requestProperties.body.phone === 'string') && requestProperties.body.phone.trim().length > 0 ? requestProperties.body.phone : false
    const passwords = typeof(requestProperties.body.passwords === 'string') && requestProperties.body.passwords.trim().length > 0 ? requestProperties.body.passwords : false


}
handler._token.delete = (requestProperties, callBack) => {
    const phone = typeof(requestProperties.body.phone === 'string') && requestProperties.body.phone.trim().length > 0 ? requestProperties.body.phone : false

}

module.exports = handler