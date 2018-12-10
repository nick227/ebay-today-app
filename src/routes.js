const termsAll = require('./terms');
let routes = Object.keys(termsAll);

var handleRequest = require('./apiHelper');

function init(app){
	for(var i=0;i<routes.length;i++){
		let route = routes[i];
		addRoute(route, app);
	}

	app.use(function(req, res, next) {
	    res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
	});

}

function addRoute(route, app){
	app.get('/'+route, function(req, response){
		terms = termsAll[route];
		handleRequest(terms, req, response);
	});
}

module.exports = {init:init};