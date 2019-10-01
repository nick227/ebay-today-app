const termsAll = require('./terms');
let routes = Object.keys(termsAll);
routes.push("");

var handleRequest = require('./apiHelper');

function init(app){
	for(var i=0;i<routes.length;i++){
		let route = routes[i];
		addRoute(route, app);
	}
	addRoute('calculations', app)
	addRoute('history', app)

	app.use(function(req, res, next) {
	    res.status(404).send("Sorry, that route doesn't exist. Have a great day :)");
	});

}

function addRoute(route, app){
	app.get('/'+route, function(req, response){
		terms = termsAll[route];
		handleRequest(terms, req, response, route);
	});
}

module.exports = {init:init};