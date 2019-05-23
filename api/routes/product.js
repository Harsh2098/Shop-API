const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Handling GET request"
    });
});

router.post('/', (req, res, next) => {
    const newProduct = {
        name: req.body.name,
        price: req.body.price
    };

    res.status(201).json({
        message: "Handling POST request",
        product: newProduct
    });
});

// Handles GET request for individual product ID
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;

    res.status(200).json({
        message: "You passed a product ID",
        id: id
    })
});

module.exports = router;