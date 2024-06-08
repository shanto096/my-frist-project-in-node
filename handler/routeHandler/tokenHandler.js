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
    const id = requestProperties.queryString.id;


    if (id) {
        lib.read('token', id, (t, err) => {
            const token = {...jsonParse(t) };

            if (!err && t) {
                callBack(200, token);
            } else {

                callBack(404, {
                    message: "requested token was not found"
                });
            }
        });
    } else {
        callBack(404, {
            message: "requested token was not found"
        });
    }
};



handler._token.put = (requestProperties, callBack) => {
    const id = typeof(requestProperties.body.id === 'string') ? requestProperties.body.id : false
    const extend = typeof(requestProperties.body.extend === 'boolean') && requestProperties.body.extend === true ? true : false

    if (id && extend) {
        lib.read("token", id, (tData, err1) => {
            let tokenObject = jsonParse(tData)
            if (tokenObject.expire > Date.now()) {
                tokenObject.expire = Date.now() + 60 * 60 * 1000;

                lib.update("token", id, tokenObject, (err2) => {
                    if (!err2) {
                        callBack(200, {
                            message: " Token Update Successful"
                        })
                    } else {
                        callBack(500, {
                            message: "There was a problem server side"
                        })
                    }
                })
            } else {
                callBack(400, {
                    message: "Token already Expired"
                })
            }
        })
    } else {
        callBack(404, {
            message: "There was a problem in your request"
        })
    }
}
handler._token.delete = (requestProperties, callBack) => {
    const id = typeof(requestProperties.queryString.id === 'string') ? requestProperties.queryString.id : false
    if (id) {
        lib.read('token', id, (userToken, err1) => {
            if (!err1 && userToken) {
                lib.delete('token', id, (err2) => {
                    if (!err2) {
                        callBack(200, {
                            message: ' User Token was deleted successfully'
                        })
                    } else {
                        callBack(500, {
                            message: ' This is server side  error'
                        })
                    }
                })
            } else {
                callBack(500, {
                    message: 'This is server side error'
                })
            }
        })

    } else {
        callBack(404, {
            message: "there was a problem in your request "
        })
    }
}

module.exports = handler