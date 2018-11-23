const express = require('express');
const app = express();
const routes = require('./src/routes');
const termsAll = require('./src/terms');
var handleRequest = require('./src/apiHelper');

for(var i=0;i<routes.length;i++){
	let route = routes[i];
	addRoute(route);
}
function addRoute(route){
	app.get('/'+route, function(req, response){
		terms = termsAll[route];
		handleRequest(terms, req, response);
	});
}
app.use(function(req, res, next) {
    res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});

app.listen(3000, function () {
    console.log('ebay app listening on port 3000.');
});