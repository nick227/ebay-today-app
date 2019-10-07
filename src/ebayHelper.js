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


function ebayHelper(termsAll, req, route, callback) {
    var endDate = typeof req.query.t === 'string' ? calcEndDate(req.query.t) + '.768Z' : calcEndDate('day') + '.768Z'
    var filters = [{ MaxPrice: typeof req.query.p === 'string' ? req.query.p : 500000 }, { MinPrice: 25 }, { EndTimeTo: endDate }, { ListingType: 'Auction' }]
    var sortOrder = typeof req.query.f === 'string' ? req.query.f : 'PricePlusShippingLowest'
    var limit = typeof req.query.z === 'string' ? req.query.z : 2
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
        if (err) {
            console.error(err.message)
        }
        console.log("ebay done", timer - Date.now())
        callback(resAll)
    })

}

function _query(ebay, terms, callback) {
    var combinedRes = []
    async.mapSeries(terms, (value, next) => {
        console.log("search: ", value)
        ebay.findItemsByKeywords(value).then((data) => {
            let res = {}
            if (data[0].ack[0] === 'Success' && data[0].searchResult[0].item) {
                let matches = data[0].searchResult[0].item
                let res = []
                if (matches.length) {
                    for (var i = 0, length1 = matches.length; i < length1; i++) {
                        obj = formatObj(matches[i], value)
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
            callback(error)
        })
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


function formatObj(item, term) {
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