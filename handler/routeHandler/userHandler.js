const lib = require('../../lib/data')
const { hash } = require('../../helper/utilities')
const { jsonParse } = require('../../helper/utilities')


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
    const phone = requestProperties.queryString.phone;

    if (phone) {
        lib.read('user', phone, (u, err) => {
            const user = {...jsonParse(u) };

            if (!err && u) {
                delete user.password;
                callBack(200, user);
            } else {

                callBack(404, {
                    message: "requested user was not found"
                });
            }
        });
    } else {
        callBack(404, {
            message: "requested user was not found"
        });
    }
};


handler._user.put = (requestProperties, callBack) => {
    const firstName = typeof(requestProperties.body.firstName === 'string') && requestProperties.body.firstName.trim().length > 0 ? requestProperties.body.firstName : false
    const lastName = typeof(requestProperties.body.lastName === 'string') && requestProperties.body.lastName.trim().length > 0 ? requestProperties.body.lastName : false
    const phone = typeof(requestProperties.body.phone === 'string') && requestProperties.body.phone.trim().length > 0 ? requestProperties.body.phone : false
    const passwords = typeof(requestProperties.body.passwords === 'string') && requestProperties.body.passwords.trim().length > 0 ? requestProperties.body.passwords : false
    if (phone) {
        if (firstName || lastName || passwords) {
            lib.read('user', phone, (uData, err1) => {
                const userData = {...jsonParse(uData) }
                if (userData && !err1) {
                    if (firstName) {
                        userData.firstName = firstName
                    }
                    if (lastName) {
                        userData.lastName = lastName
                    }
                    if (passwords) {
                        userData.password = hash(passwords)
                    }

                    // store fs database.......
                    lib.update('user', phone, userData, (err2) => {
                        if (!err2) {
                            callBack(200, {
                                message: "updated user successful"
                            })
                        } else {
                            callBack(500, {
                                message: "there was problem in sever side "
                            })
                        }
                    })

                } else {
                    callBack(400, {
                        message: " you have problem in your request"
                    })

                }
            })
        } else {
            callBack(500, {
                message: 'problem in server side '
            })
        }
    }
}
handler._user.delete = (requestProperties, callBack) => {

}

module.exports = handler