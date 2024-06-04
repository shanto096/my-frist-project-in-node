const lib = require('../../lib/data')
const { hash } = require('../../helper/utilities')


const handler = {}

handler.userHandler = (requestProperties, callBack) => {
    const acceptedMethod = ['get', 'post', 'put', 'delete']
    if (acceptedMethod.indexOf(requestProperties.method) > -1) {
        handler.__user[requestProperties.method](requestProperties, callBack)
    } else {
        callBack(405)
    }

}

//request handling ....................
handler.__user = {}
handler.__user.post = (requestProperties, callBack) => {
    console.log(requestProperties.body);
    const firstName = typeof(requestProperties.body.firstName === 'string' && requestProperties.body.firstName.trim().length > 0 ? requestProperties.body.firstName : null)
    const lastName = typeof(requestProperties.body.lastName === 'string' && requestProperties.body.lastName.trim().length > 0 ? requestProperties.body.lastName : null)
    const phone = typeof(requestProperties.body.phone === 'string' && requestProperties.body.phone.trim().length > 0 ? requestProperties.body.phone : null)
    const passwords = typeof(requestProperties.body.passwords === 'string' && requestProperties.body.passwords.trim().length > 0 ? requestProperties.body.passwords : null)
    const t = typeof(requestProperties.body.t === 'boolean' && requestProperties.body.t.trim().length > 0 ? requestProperties.body.t : null)


    if (firstName && lastName && phone && passwords && t) {
        lib.read('user', phone, (err1) => {
            if (err1) {
                let userData = {
                    firstName,
                    lastName,
                    phone,
                    password: hash(passwords),
                    t

                }
                lib.create('user', phone, userData, (err2) => {
                    if (err2) {
                        callBack(200, {
                            message: 'created successfully'
                        })
                    } else {
                        callBack(500, {
                            error: ' could not create user'
                        })
                    }
                })


            } else {
                callBack(500, {
                    error: 'there was error server side'
                })
            }
        })
    } else {
        callBack(400, {
            status: 'user bad request '
        })
    }

}
handler.__user.get = (requestProperties, callBack) => {

}
handler.__user.put = (requestProperties, callBack) => {

}
handler.__user.delete = (requestProperties, callBack) => {

}

module.exports = handler