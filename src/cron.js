const termsAll = require('./terms');
const ebayHelper = require('./ebayHelper')
const dataObj = require('./data')
        ebayHelper(termsAll, {}, function(res) {
            dataObj.save(res, function(res) {
                return process.exit(res)
            })
        })