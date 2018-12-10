const express = require('express');
const app = express();
const routes = require('./src/routes');

routes.init(app);

app.listen(process.env.PORT || 3000, function () {
    console.log('ebay app listening on port '+process.env.PORT || 3000);
});