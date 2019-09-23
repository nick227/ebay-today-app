const data = {}
const async = require('async')
const firebase = require('firebase')
/*
var admin = require("firebase-admin");

var serviceAccount = require("../to/camera-watcher-7dd72-firebase-adminsdk-ntel7-d4d055f946.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://camera-watcher-7dd72.firebaseio.com"
});
*/
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
data.save = function(data, callback) {
    let tmpObj = []
    let count = 0
    let key = null

    async.mapSeries(data, (row, next) => {
        row = extract(row)
        key = row.term + ' - ' + row.category
        db.collection(key).doc(row.id).get().then(function(r) {
            if (typeof r.data() !== 'object') {
                console.log("object writing: ", key, row.id)
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
	console.log("finish write", Date.now())
        for (var i = 0, length1 = tmpObj.length; i < length1; i++) {
            calculateAgg(tmpObj[i], callback)
        }
    });



}
data.getCalculations = function(keys, callback) {
    var results = []
    async.mapSeries(keys, (value, next) => {
        db.collection('calculations').where('key', '==', value).get().then(function(querySnapshot) {
            console.log(value, ".", querySnapshot.length)
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
    console.log("get: ", key)
    db.collection(key).get().then(function(snapshot) {
        var c = 0
        var total = 0
        snapshot.forEach(function(doc, index) {
            total = total + parseInt(doc.data().price)
            c++
        });
        var avg = total / c
        var payload = { key: key, avg: avg, total: total, count: c }
        console.log("agg writing: ", key, payload)
        db.collection('calculations').doc(key).set(payload, { merge: true }).then(function(res) {
	console.log("finish writing agg", Date.now())
            console.log("calc updated")
            callback(res)
        })
    })
}


module.exports = data;