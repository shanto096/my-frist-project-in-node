const lib = require('../../lib/data')
const { hash } = require('../../helper/utilities')


const handler = {}

handler.userHandler = (requestProperties, callBack) => {
    const acceptedMethod = ['get', 'post', 'put', 'delete']
    if (acceptedMethod.indexOf(requestProperties.method) > -1) {
        handler._user[requestProperties.method](requestProperties, callBack)
    } else {
        callBack(405)
    }

}

//request handling ....................
handler._user = {}
handler._user.post = (requestProperties, callBack) => {

    const firstName = typeof(requestProperties.body.firstName === 'string') && requestProperties.body.firstName.trim().length > 0 ? requestProperties.body.firstName : false
    const lastName = typeof(requestProperties.body.lastName === 'string') && requestProperties.body.lastName.trim().length > 0 ? requestProperties.body.lastName : false
    const phone = typeof(requestProperties.body.phone === 'string') && requestProperties.body.phone.trim().length > 0 ? requestProperties.body.phone : false
    const passwords = typeof(requestProperties.body.passwords === 'string') && requestProperties.body.passwords.trim().length > 0 ? requestProperties.body.passwords : false
    const tomes = requestProperties.body.tomes


    if (firstName && lastName && phone && passwords && tomes) {
        lib.read('user', phone, (err1) => {
            if (err1) {
                let userData = {
                    firstName,
                    lastName,
                    phone,
                    password: hash(passwords),
                    tomes
                }



                lib.create('user', phone, userData, (err2) => {
                    if (!err2) {
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
handler._user.get = (requestProperties, callBack) => {

}
handler._user.put = (requestProperties, callBack) => {

}
handler._user.delete = (requestProperties, callBack) => {

}

module.exports = handler