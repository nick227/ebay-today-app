const data = {}
const async = require('async')
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
const db = firebase.firestore()

function extract(obj) {
    return {
        category: obj.category,
        condition: obj.condition,
        id: obj.id,
        location: obj.location,
        price: obj.price,
        endDate:obj.endTime,
        term: obj.term,
        title: obj.title,
        type: obj.type,
        url: obj.viewItemURL
    }
}
data.save = function(data) {
    let tmpObj = []
    let count = 0
    let key = null

    async.mapSeries(data, (row, next) => {
        row = extract(row)
        key = row.term + ' - ' + row.category
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
        for (var i = 0, length1 = tmpObj.length; i < length1; i++) {
            calculateAgg(tmpObj[i])
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
        callback(results)
    });
}

function calculateAgg(key) {
    db.collection(key).get().then(function(snapshot) {
        var c = 0
        var total = 0
        snapshot.forEach(function(doc, index) {
            total = total + parseInt(doc.data().price)
            c++
        });
        var avg = total / c
        var payload = { key: key, avg: avg, total: total, count: c }
        db.collection('calculations').doc(key).set(payload, { merge: true }).then(function(res) {
            console.log("calc updated")
        })
    })
}


module.exports = data;