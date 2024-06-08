const { simpleHandler } = require('./handler/routeHandler/simpleHandler')
const { userHandler } = require('./handler/routeHandler/userHandler')
const { tokenHandler } = require('./handler/routeHandler/tokenHandler')

const route = {
    'simple': simpleHandler,
    'user': userHandler,
    'token': tokenHandler,
}
module.exports = route