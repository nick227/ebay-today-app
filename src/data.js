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
data.save = function(data) {
    const db = firebase.firestore();
    let tmpObj = []
    let count = 0
    let id = null

    async.mapSeries(data, (row, next) => {
        row = extract(row)
        id = row.term + ' - ' + row.category
        db.collection(id).doc(row.id).set(row, { merge: true }).then(function(res, msg) {
            if (tmpObj.indexOf(id) === -1) {
                tmpObj.push(id)
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

function getAggregatePrice(key, callback) {
    console.log(key)
}
function checkCache(key){
	return false
}


module.exports = data;