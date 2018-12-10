const express = require('express');
const app = express();
const routes = require('./src/routes');

routes.init(app);

app.listen(3000, function () {
    console.log('ebay app listening on port 3000.');
});