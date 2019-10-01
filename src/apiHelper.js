const Ebay = require('./Ebay');
const EBAY_KEY = require('../private').ebay;
const async = require('async');
const moment = require('moment');
const _ = require('underscore');
const terms = require('./terms');
const dataObj = require('./data');

let { wrapHTML } = require('./createHTML.js');

function handleRequest(termsAll, req, response, route) {
    var counter = 0;
    var resAll = [];
    var endDate = typeof req.query.t === 'string' ? calcEndDate(req.query.t) + '.768Z' : calcEndDate('day') + '.768Z';
    var filters = [{ MaxPrice: typeof req.query.p === 'string' ? req.query.p : 500000 }, { MinPrice: 25 }, { EndTimeTo: endDate }, { ListingType: 'Auction' }];
    var sortOrder = typeof req.query.f === 'string' ? req.query.f : 'PricePlusShippingLowest';
    var limit = typeof req.query.z === 'string' ? req.query.z : 30;
    let ebay = new Ebay({
        clientID: EBAY_KEY,
        limit: limit,
        sortOrder: sortOrder,
        filters: filters
    });
    async.mapSeries(termsAll, (terms, next) => {
        generate(ebay, terms, counter, function(obj) {
            resAll = resAll.concat(obj)
            next();
        });
        counter++;
    }, (err, res) => {
        if (err) { console.error(err.message); }
        finish(response, resAll, route);
    });
}

function generate(ebay, terms, counter, callback) {
    var combinedRes = [];
    async.mapSeries(terms, (value, next) => {
        ebay.findItemsByKeywords(value).then((data) => {
        	if(data[0].ack[0] !== 'Success'){
        		return false;
        	}
            let res = {};
            if (typeof data[0] === 'object' && typeof data[0].searchResult[0].item === 'object') {
                let matches = data[0].searchResult[0].item
                let res = []
                if (matches.length) {
                    for (var i = 0, length1 = matches.length; i < length1; i++) {
                        res.push(formatObj(matches[i], value))
                    }
                    combinedRes = combinedRes.concat(res)
                }
            }
            next();
        }, (error) => {
            callback(error);
        });
    }, err => {
        if (err) { callback(err); }
        callback(combinedRes);
    });
}

function convertEbayTime(str) {
    var days = str.substring(str.indexOf('P') + 1, str.indexOf('D'))
    var hours = str.substring(str.indexOf('T') + 1, str.indexOf('H'))
    var minutes = str.substring(str.indexOf('H') + 1, str.indexOf('M'))
    var seconds = str.substring(str.indexOf('M') + 1, str.indexOf('S'))
    return { days, hours, minutes, seconds };
}


function formatObj(item, term) {

    var res = {}
    var { days, hours, minutes, seconds } = convertEbayTime(item.sellingStatus[0].timeLeft.toString())
    res['id'] = item.itemId[0]
    res['term'] = term
    res['category'] = item.primaryCategory[0].categoryName[0]
    res['title'] = item.title[0]
    res['price'] = item.sellingStatus[0].currentPrice[0]['__value__']
    res['condition'] = item.condition ? item.condition[0]['conditionDisplayName'][0] : ''
    res['location'] = item.location[0]
    res['endTime'] = days + ' days ' + hours + ' hours ' + minutes + ' minutes ' + seconds + ' seconds'
    res['type'] = item.listingInfo[0]['listingType'][0]
    res['viewItemURL'] = item.viewItemURL[0]
    res['links'] = '<a href="' + item.viewItemURL[0] + '" target="_blank">ebay</a><BR><a href="https://www.amazon.com/s/ref=nb_sb_noss_1?url=search-alias%3Daps&field-keywords=' + encodeURI(item.title[0]) + '" target="_blank">amazon</a><BR><a href="https://www.google.com/search?q=' + encodeURI(item.title[0]) + '" target="_blank">google</a>'
    res['galleryURL'] = item.galleryURL[0]
    res['history'] = '<label class="switch"><input class="toggle-history" data-id="'+ res['id'] +'" type="checkbox"><span class="slider round"></span></label>'

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
    return obj[type];
}

<<<<<<< HEAD

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
=======
function finish(res, data, route) {
	dataObj.save(data)
    let html = wrapHTML(data, Object.keys(terms), route);
    res.send(html);
>>>>>>> 51bedeeacefa1400b2493f6a4337a75ee35622b3
}
module.exports = handleRequest;