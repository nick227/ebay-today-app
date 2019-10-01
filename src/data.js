const firebase = require('firebase')
firebase.initializeApp({
    apiKey: "AIzaSyBNfmTvaAb30R0IoeZ0thow7EFTffDJ4Bg",
    authDomain: "camera-watcher-7dd72.firebaseapp.com",
    databaseURL: "https://camera-watcher-7dd72.firebaseio.com",
    projectId: "camera-watcher-7dd72",
    storageBucket: "camera-watcher-7dd72.appspot.com",
    messagingSenderId: "306334346433",
    appId: "1:306334346433:web:5ee9f8e1f2223df656f840"
});
const async = require('async')
const data = {}

function extract(obj) {
    return {
        category: obj.category,
        condition: obj.condition,
        id: obj.id,
        location: obj.location,
        price: obj.price,
        term: obj.term,
        title: obj.title,
        type: obj.type,
        url: obj.viewItemURL
    }
}
<<<<<<< HEAD
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
=======
data.save = function(data) {
    const db = firebase.firestore();
>>>>>>> 51bedeeacefa1400b2493f6a4337a75ee35622b3
    let tmpObj = []
    let count = 0
    let id = null

    async.mapSeries(data, (row, next) => {
        row = extract(row)
<<<<<<< HEAD
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
=======
        id = row.term + ' - ' + row.category
        db.collection(id).doc(row.id).set(row, { merge: true }).then(function(res, msg) {
            if (tmpObj.indexOf(id) === -1) {
                tmpObj.push(id)
>>>>>>> 51bedeeacefa1400b2493f6a4337a75ee35622b3
            }
            next()
        })
    }, function(err, results) {
        var key = null
        for (var i = 0, length1 = tmpObj.length; i < length1; i++) {
            key = tmpObj[i]
            const cache = checkCache(key)
            if (!cache) {
                getAggregatePrice(key, function(val) {
                    db.collection('aggregates').doc(key).set(val, { merge: true })
                })
            }
        }
    });



}
<<<<<<< HEAD
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
=======
>>>>>>> 51bedeeacefa1400b2493f6a4337a75ee35622b3

function getAggregatePrice(key, callback) {
    console.log(key)
}
function checkCache(key){
	return false
}


module.exports = data;