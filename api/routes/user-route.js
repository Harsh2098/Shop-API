const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user')
const mongoose = require('mongoose');

router.post('/signup', (req, res, next) => {
    User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
        if(user) {
            res.status(409).json({
                message: 'Email already exists'
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err) {
                    res.status(500).json({error: err});
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(), 
                        email: req.body.email,
                        password: hash
                    })

                    user
                    .save()
                    .then(result => {
                        console.log(result)
                        res.status(201).json({
                            message: 'New user created'
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({error: err});
                    });
                }
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;