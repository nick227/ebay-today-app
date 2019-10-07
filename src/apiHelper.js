const dataObj = require('./data')
var { wrapHTML } = require('./createHTML.js')


function handleRequest(req, response, route) {
        dataObj.get(route, function(res) {
            response.send(wrapHTML(res, route))
        })
}
module.exports = handleRequest