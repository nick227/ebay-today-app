const ebayHelper = require('./ebayHelper')
const dataObj = require('./data')
var { wrapHTML } = require('./createHTML.js')


function handleRequest(termsAll, req, response, route) {
    if (route === 'cron-sync') {
        ebayHelper(termsAll, req, route, function(res) {
            dataObj.save(res, function(res) {
                response.send(res)
            })
        })

    } else {
        dataObj.get(route, function(res) {
            response.send(wrapHTML(res, termsAll, route))
        })
    }
}
module.exports = handleRequest