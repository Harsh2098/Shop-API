const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product')

router.get('/', (req, res, next) => {
    Product.find()
    .exec()
    .then(products => {
        console.log(products);
        if(products && products.length > 0)
            res.status(200).json({products});
        else
            res.status(404).json({message: "No products found"});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
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
        res.status(201).json({
            message: "New product created",
            product: newProduct
        });
    })
    .catch(err => {
        console.log(err);
    });
});

// Handles GET request for individual product ID
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;

    Product.findById(id)
    .exec()
    .then(result => {
        console.log(result);
        if(result)
            res.status(200).json(result);
        else
            res.status(404).json({message: "No item with id "+ id + "found"});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;

    Product.remove({_id: id})
    .exec()
    .then(result => {
        console.log(result);
        if(result)
            res.status(200).json(result);
        else
            res.status(404).json({message: "No item with id "+ id + "found"});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

module.exports = router;