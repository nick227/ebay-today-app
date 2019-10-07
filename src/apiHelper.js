const dataObj = require('./data')
var { wrapHTML } = require('./createHTML.js')


function handleRequest(termsAll, req, response, route) {
        dataObj.get(route, function(res) {
            response.send(wrapHTML(res, termsAll, route))
        })
}
module.exports = handleRequest