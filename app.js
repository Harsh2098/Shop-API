const express = require('express');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productsRoute = require('./api/routes/product-route')

mongoose.connect(
    'mongodb+srv://admin:' + process.env.MONGO_ATLAS_PASSWORD + '@rest-shop-6hkxp.mongodb.net/test?retryWrites=true',
    {
        useNewUrlParser: true
    }
);

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization');
    if(req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT');
        return res.status(200).json({});
    }
    next();
})

app.use('/products', productsRoute);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;