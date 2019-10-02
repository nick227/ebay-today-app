const data = {}
const async = require('async')
const firebase = require('firebase')
const FIREBASE_KEY = require('../private').firebase
firebase.initializeApp(FIREBASE_KEY);
const db = firebase.firestore()
var timer = Date.now()
function extract(obj) {
    return {
        category: obj.category,
        condition: obj.condition,
        id: obj.id,
        location: obj.location,
        price: obj.price,
        endDate:obj.endDate,
        term: obj.term,
        title: obj.title,
        type: obj.type,
        url: obj.viewItemURL
    }
}
data.getHistory = function(key, callback){
    var res = []
        db.collection(key).get().then(function(snapshot) {

        snapshot.forEach(function(doc, index) {
            res.push(doc.data())
        })
            callback(res)
        })
}
data.save = function(data, callback) {
    let tmpObj = []
    let count = 0
    let key = null

    async.mapSeries(data, (row, next) => {
        row = extract(row)
        key = row.term + ' - ' + row.category.replace('/','-')
        db.collection(key).doc(row.id).get().then(function(r) {
            if (typeof r.data() !== 'object') {
                db.collection(key).doc(row.id).set(row, { merge: true }).then(function(res, msg) {
                    if (tmpObj.indexOf(key) === -1) {
                        tmpObj.push(key)
                    }
                    next()
                })
            }else{
            	next()
            }
        })

    }, function(err, results) {
	console.log("finished firebase item save", timer-Date.now())
        for (var i = 0, length1 = tmpObj.length; i < length1; i++) {
            calculateAgg(tmpObj[i], callback)
        }
    });



}
data.getCalculations = function(keys, callback) {
    var results = []
    async.mapSeries(keys, (value, next) => {
        db.collection('calculations').where('key', '==', value).get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                results.push(doc.data())
            });
            next()
        }).catch(function(err) { console.log('error: ' + err) })
    }, function(err, res) {
	console.log("finish get agg", Date.now())
        callback(results)
    });
}

function calculateAgg(key, callback) {
    console.log("read: ", key)
    db.collection(key).get().then(function(snapshot) {
        var c = 0
        var total = 0
        snapshot.forEach(function(doc, index) {
            total = total + parseInt(doc.data().price)
            c++
        });
        var avg = total / c
        var payload = { key: key, avg: avg, total: total, count: c }
        console.log("calc writing: ", key, payload)
        db.collection('calculations').doc(key).set(payload, { merge: true }).then(function(res) {
    console.log("finished firebase calc", timer-Date.now())
            console.log("calc updated")
            callback(res)
        })
    })
}


module.exports = data;