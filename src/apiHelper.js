const dataObj = require('./data')
var { wrapHTML } = require('./createHTML.js')


function handleRequest(req, response, route) {
    if (route === 'history') {
        dataObj.getHistory(req.query.k, function(res) {
            response.send(res)
        })

    } else {
        dataObj.get(route, function(res) {
            response.send(wrapHTML(res, route))
        })

    }
}
module.exports = handleRequest