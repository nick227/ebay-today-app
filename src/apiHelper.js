
const Ebay = require('./index');
const EBAY_KEY = require('./private').ebay;
const async = require('async');
const moment = require('moment');
const _ = require('underscore');

let {wrapRow, createColumn, wrapHTML} = require('./createHTML.js');

function handleRequest(termsAll, req, response){
	var counter=0;
	var htmlAll='';
	var endDate = typeof req.query.t === 'string' ? calcEndDate(req.query.t) : calcEndDate('day');
	console.log(endDate);
	var filters=[{MaxPrice:typeof req.query.p === 'string' ? req.query.p : 500}, {MinPrice:25}, {EndTimeTo:endDate}, {ListingType:'Auction'}];
	var sortOrder = typeof req.query.f === 'string' ? req.query.f : 'EndTimeSoonest';
	var limit = typeof req.query.z === 'string' ? req.query.z : 50;
	let ebay = new Ebay({
	    clientID: EBAY_KEY,
	    limit: limit,
	    sortOrder:sortOrder,
	    filters:filters
	});
	async.mapSeries(termsAll, (terms, next) => {
			generate(ebay, terms, counter, function(html){
				html=wrapRow(html);
				htmlAll+=html;
				next();
			});
			counter++;
		}, (err, res) => {
		    if (err){ console.error(err.message); }
		    finish(response, htmlAll);
		});
}
function calcEndDate(type){
	var obj = {
		day:moment().add(1, 'd').format(),
		three:moment().add(3, 'd').format(),
		hour:moment().add(1, 'h').format(),
		minute:moment().add(1, 'm').format(),
		all:moment().add(31, 'd').format()
	}
	return obj[type];
}

function finish(res, data){
	let html = wrapHTML(data);
	res.send(html);
}
function generate(ebay, terms, counter, callback){
	var combinedHTML = '';
	async.mapSeries(terms, (value, next) => {
		ebay.findItemsByKeywords(value).then((data) => {
			let html = '';
			if(typeof data[0]==='object' && typeof data[0].searchResult[0].item==='object'){
				let items = data[0].searchResult[0].item;
				html = createColumn(items, value, counter);
			}
	    	combinedHTML += html.toString();
	    	next();
		}, (error) => {
		    console.log(error);
		});
	}, err => {
	    if (err){ console.error(err.message); }
	    callback(combinedHTML);
	});
}
module.exports = handleRequest;