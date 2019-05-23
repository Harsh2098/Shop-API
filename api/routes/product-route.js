const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product')

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Handling GET request"
    });
});

router.post('/', (req, res, next) => {
    
    const newProduct = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    newProduct.save()
    .then(result => {
        console.log(result);
    })
    .catch(err => {
        console.log(err);
    });

    res.status(201).json({
        message: "New product created",
        product: newProduct
    });
});

// Handles GET request for individual product ID
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;

    Product.findById(id)
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(500).json({error: err});
    });
});

module.exports = router;