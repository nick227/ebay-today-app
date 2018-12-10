const express = require('express');
const app = express();
const routes = require('./src/routes');

routes.init(app);

app.listen(8080, function () {
    console.log('ebay app listening on port 8080.');
});