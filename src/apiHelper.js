const Ebay = require('./Ebay')
const EBAY_KEY = require('../private').ebay
const async = require('async')
const moment = require('moment')
const _ = require('underscore')
const terms = require('./terms')
const dataObj = require('./data')

var { wrapHTML } = require('./createHTML.js')
var fresh = false

    var n = 0
var timer = Date.now()
        var key = null
        var keys = []

function handleRequest(termsAll, req, response, route) {
    console.log("^^^^^^^^^")
    console.log("go!", timer)
    if(route === 'history'){
        dataObj.getHistory(req.query.k, function(historyData){
            response.send(historyData)

        })
    }
    else if(route === 'calculations'){

        dataObj.getCalculations(keys, function(calcData) {

            response.send(calcData)
        })
    }else{
        requestEbay(termsAll, req, response, route)

    }
}

function requestEbay(termsAll, req, response, route) {
    var counter = 0
    var resAll = []
    var endDate = typeof req.query.t === 'string' ? calcEndDate(req.query.t) + '.768Z' : calcEndDate('day') + '.768Z'
    var filters = [{ MaxPrice: typeof req.query.p === 'string' ? req.query.p : 500000 }, { MinPrice: 25 }, { EndTimeTo: endDate }, { ListingType: 'Auction' }]
    var sortOrder = typeof req.query.f === 'string' ? req.query.f : 'PricePlusShippingLowest'
    var limit = typeof req.query.z === 'string' ? req.query.z : 30
    limit = route === 'test' ? 2 : limit
    let ebay = new Ebay({
        clientID: EBAY_KEY,
        limit: limit,
        sortOrder: sortOrder,
        filters: filters
    })
    async.mapSeries(termsAll, (terms, next) => {
        generate(ebay, terms, counter, function(obj) {
            console.log("ebay1!", timer - Date.now())
            resAll = resAll.concat(obj)
            next()
        })
        counter++
    }, (err, res) => {
        if (err) { console.error(err.message) }
        console.log("ebay done", timer - Date.now())
        for (var i = 0, length1 = resAll.length; i < length1; i++) {
            key = resAll[i].term + ' - ' + resAll[i].category
            if (keys.indexOf(key) === -1) {
                keys.push(key)
            }
        }
            let html = wrapHTML(resAll, Object.keys(terms), route)
            console.log("all done!!!", timer - Date.now())
            console.log("-----------")
                response.send(html)
            dataObj.save(resAll, function(){
            })
    })

}

function generate(ebay, terms, counter, callback) {
    var combinedRes = []
    async.mapSeries(terms, (value, next) => {
        ebay.findItemsByKeywords(value).then((data) => {
            let res = {}
            if (data[0].ack[0] === 'Success' && data[0].searchResult[0].item) {
                let matches = data[0].searchResult[0].item
                let res = []
                if (matches.length) {
                    console.log("match len: ", matches.length)
                    for (var i = 0, length1 = matches.length; i < length1; i++) {
                        res.push(formatObj(matches[i], value))
                    }
                    n++
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
    res['average'] = '<div class="average"></div>'
    res['difference'] = '<div class="difference"></div>'
    res['numFound'] = '<div class="numFound"></div>'
    res['condition'] = item.condition ? item.condition[0]['conditionDisplayName'][0] : ''
    res['location'] = item.location[0]
    res['endTime'] = days + ' days ' + hours + ' hours ' + minutes + ' minutes ' + seconds + ' seconds'
    res['endDate'] = item.listingInfo[0].endTime.toString()
    res['type'] = item.listingInfo[0]['listingType'][0]
    res['viewItemURL'] = item.viewItemURL[0]
    res['links'] = '<a href="' + item.viewItemURL[0] + '" target="_blank">ebay</a><BR><a href="https://www.amazon.com/s/ref=nb_sb_noss_1?url=search-alias%3Daps&field-keywords=' + encodeURI(item.title[0]) + '" target="_blank">amazon</a><BR><a href="https://www.google.com/search?q=' + encodeURI(item.title[0]) + '" target="_blank">google</a>'
    res['galleryURL'] = item.galleryURL[0]
    res['history'] = '<label class="switch"><input class="toggle-history"  data-id="' + res['id'] + '" data-key="' + res['term'] + ' - ' + res['category'] + '" data-price="' + res['price'] + '" type="checkbox"><span class="slider round"></span></label>'

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


function attachCalculations(obj, data) {
    for (var i = 0, length1 = data.length; i < length1; i++) {
        let dataRow = data[i]
        let key = dataRow.term + ' - ' + dataRow.category.replace('/','-')
        let calcRow = obj.find(o => {
            return o.key === key
        })
        dataRow.average = calcRow.avg.toFixed(0)
        dataRow.numFound = calcRow.count.toFixed(0)
        dataRow.difference = (parseInt(dataRow.price) - calcRow.avg).toFixed(0)
    }
}
module.exports = handleRequest