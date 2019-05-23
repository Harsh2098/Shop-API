const express = require('express');
const app = express();
const logger = require('morgan');

const productsRoute = require('./api/routes/product')

app.use(logger('dev'));
app.use('/products', productsRoute);

module.exports = app;