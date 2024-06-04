const { simpleHandler } = require('./handler/routeHandler/simpleHandler')
const { userHandler } = require('./handler/routeHandler/userHandler')

const route = {
    'simple': simpleHandler,
    'user': userHandler,
}
module.exports = route