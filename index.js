require('font-awesome/css/font-awesome')
const context = require.context('./components', true, /\.styl$/)
context.keys().forEach(context)
module.exports = require('./components')
