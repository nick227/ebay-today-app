const Ebay = require('./Ebay')
const EBAY_KEY = require('../private').ebay
const async = require('async')
const moment = require('moment')

var timer = Date.now()
var key = null
var obj = null
var id = null
var idList = []
var resAll = []
var queryTimer = 1000

function ebayHelper(termsAll, req, callback) {
    var endDate = typeof req.t === 'string' ? calcEndDate(req.t) + '.768Z' : calcEndDate('day') + '.768Z'
    var filters = [{ MaxPrice: typeof req.p === 'string' ? req.p : 500000 }, { MinPrice: 25 }, { EndTimeTo: endDate },{ ListingType: 'Auction' }]
    var sortOrder = typeof req.f === 'string' ? req.f : 'PricePlusShippingLowest'
    var limit = typeof req.z === 'string' ? req.z : 50
    var ebayObj = new Ebay({
        clientID: EBAY_KEY,
        limit: limit,
        sortOrder: sortOrder,
        filters: filters
    })
    async.mapSeries(termsAll, (terms, next) => {
        _query(ebayObj, terms, function(obj) {
            resAll = resAll.concat(obj)
            next()
        })
    }, (err, res) => {
        callback(resAll)
    })

}

function _query(ebay, terms, callback) {
    var combinedRes = []
    async.mapSeries(terms, (value, next) => {
        console.log("go:", value)
        setTimeout(function(){
        ebay.findItemsByKeywords(value).then((data) => {
            let res = {}
            if (data[0].ack[0] === 'Success' && data[0].searchResult[0].item) {
                let matches = data[0].searchResult[0].item
                let res = []
                if (matches.length) {
                    for (var i = 0, length1 = matches.length; i < length1; i++) {
                        obj = formatEbayResults(matches[i], value)
                        key = value
                        id = obj.id
                        if (idList.indexOf(id) === -1) {
                            idList.push(id)
                            res.push(obj)
                        }
                    }
                    combinedRes = combinedRes.concat(res)
                }
            }
            next()
        }, (error) => {
            console.log("callback")
            callback(error)
        })

        }, queryTimer)
    }, err => {
        callback(combinedRes)
    })
}

function convertEbayTime(str) {
    var days = str.substring(str.indexOf('P') + 1, str.indexOf('D'))
    var hours = str.substring(str.indexOf('T') + 1, str.indexOf('H'))
    var minutes = str.substring(str.indexOf('H') + 1, str.indexOf('M'))
    var seconds = str.substring(str.indexOf('M') + 1, str.indexOf('S'))
    return { days, hours, minutes, seconds }
}


function formatEbayResults(item, term) {
    var res = {}
    var { days, hours, minutes, seconds } = convertEbayTime(item.sellingStatus[0].timeLeft.toString())
    res['id'] = item.itemId[0]
    res['term'] = term.trim()
    res['category'] = item.primaryCategory[0].categoryName[0]
    res['title'] = item.title[0]
    res['price'] = item.sellingStatus[0].currentPrice[0]['__value__']
    res['condition'] = item.condition ? item.condition[0]['conditionDisplayName'][0] : ''
    res['location'] = item.location[0]
    res['endDate'] = item.listingInfo[0].endTime.toString()
    res['type'] = item.listingInfo[0]['listingType'][0]
    res['viewItemURL'] = item.viewItemURL[0]
    res['galleryURL'] = typeof item.galleryURL === 'object' ? item.galleryURL[0] : ''
    res['history'] = '<label class="switch"><input class="toggle-history"  data-id="' + res['id'] + '" data-term="' + res['term'] + '" data-category="' + res['category'] + '" data-price="' + res['price'] + '" type="checkbox"><span class="slider round"></span></label>'

    return res
}

function calcEndDate(type) {
    var obj = {
        day: moment().add(1, 'd').format("YYYY-MM-DDTHH:mm:ss"),
        three: moment().add(3, 'd').format("YYYY-MM-DDTHH:mm:ss"),
        hour: moment().add(1, 'h').format("YYYY-MM-DDTHH:mm:ss"),
        minute: moment().add(1, 'm').format("YYYY-MM-DDTHH:mm:ss"),
        all: moment().add(31, 'd').format("YYYY-MM-DDTHH:mm:ss")
    }
    return obj[type]
}
module.exports = ebayHelper