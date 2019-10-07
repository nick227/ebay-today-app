const data = {}
const termsAll = require('./terms')
const async = require('async')
const firebase = require('firebase')
const FIREBASE_KEY = require('../private').firebase
firebase.initializeApp(FIREBASE_KEY);
const db = firebase.firestore()
var timer = Date.now()
const moment = require('moment')

function maskWriteObj(obj) {
    console.log("write:", obj.title)
    return {
        category: obj.category,
        condition: obj.condition,
        id: obj.id,
        location: obj.location,
        price: obj.price,
        endDate: obj.endDate,
        epoch: moment(obj.endDate).unix(),
        term: obj.term,
        title: obj.title,
        type: obj.type,
        galleryURL: obj.galleryURL,
        url: obj.viewItemURL
    }
}
function maskReadObj(obj, key) {
    return {
        image: obj.galleryURL,
        title: obj.title,
        condition: obj.condition,
        price: obj.price,
        diff: obj.diff,
        avg: obj.avg,
        found: obj.found,
        term: key,
        category: obj.category,
        price: obj.price,
        ending: formatEndDate(obj.endDate),
        type: obj.type,
        id: obj.id,
        location: obj.location,
        links: '<a href="' + obj.url + '" target="_blank">ebay</a><BR><a href="https://www.amazon.com/s/ref=nb_sb_noss_1?url=search-alias%3Daps&field-keywords=' + encodeURI(obj.title) + '" target="_blank">amazon</a><BR><a href="https://www.google.com/search?q=' + encodeURI(obj.title) + '" target="_blank">google</a>'
    }
}
function formatEndDate(date){
    var seconds = moment(date).unix()
    var d = Math.abs(seconds - moment().unix());                        
var r = {};                                                               
var s = {             
    day: 86400,   
    hour: 3600,
    minute: 60,
    second: 1
};

Object.keys(s).forEach(function(key){
    r[key] = Math.floor(d / s[key]);
    d -= r[key] * s[key];
});
return r['hour'] + ' hours ' + r['minute'] + ' minutes ' + r['second'] + ' seconds'
}

function calculateAgg(key, callback) {
    db.collection(key).get().then(function(snapshot) {
        var c = 0
        var total = 0
        snapshot.forEach(function(doc, index) {
            total = total + parseInt(doc.data().price)
            c++
        });
        var avg = total / c
        callback({ key: key, avg: avg, total: total, count: c })
    })
}

data.get = function(key, callback) {
    var res = []
    async.mapSeries(termsAll[key], (key, next) => {
        _query(key, function(data) {
            res = res.concat(data)
            next()
        })

    }, function(err, r) {
        callback(res)
    });

    function _query(key, callback) {
        db.collection(key).get().then(function(snapshot) {
            var res = []
            var total = 0
            var c = 0
            snapshot.forEach(function(doc, index) {
                if (doc.data().epoch > Math.round(Date.now() / 1000)) {
                    res.push(doc.data())
                }
                total = total + parseInt(doc.data().price)
                c++

            })
            if (c && res.length) {
                var avg = Math.round(total / c)
                for (var i = res.length - 1; i >= 0; i--) {
                    res[i].diff = Math.round(res[i].price - avg)
                    res[i].found = c
                    res[i].avg = avg
                    res[i] = maskReadObj(res[i], key)
                }

            }
            callback(res)
        })

    }
}
data.save = function(data, callback) {
    let tmpObj = []
    let count = 0
    let key = null
    async.mapSeries(data, (row, next) => {
        row = maskWriteObj(row)
        key = row.term
        db.collection(key).doc(row.id).set(row, { merge: true }).then(function(res, msg) {
            if (tmpObj.indexOf(key) === -1) {
                tmpObj.push(key)
            }
            next()
        })

    }, function(err, results) {
        callback(tmpObj)
    });



}


module.exports = data;