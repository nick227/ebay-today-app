const express = require('express');
const app = express();
const routes = require('./src/routes');
const port = process.env.PORT || 3000;
routes.init(app);

app.listen(port, function () {
    console.log('ebay app listening on port '+port);
});