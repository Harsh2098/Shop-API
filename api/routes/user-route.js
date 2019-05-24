const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const User = require("../models/user");
const mongoose = require("mongoose");

router.post("/signup", (req, res, next) => {
  User.findOne({
    email: req.body.email
  })
    .exec()
    .then(user => {
      if (user) {
        return res.status(409).json({
          message: "Email already exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash
            });

            user
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "New user created"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
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

router.post("/login", (req, res, next) => {
  User.findOne({ email: req.body.email })
  .exec()
  .then(user => {
    if(user) {
      bcrypt.compare(req.body.password, user.password, (err, match) => {
        if(err) return req.status(500).json({message: "Authentication failed"});

        if(match) {
          const token = jwt.sign({
            email: user.email,
            userId: user._id
          },
          process.env.JWT_KEY, {
            expiresIn: '1h'
          });

          return res.status(200).json({
            message: 'Authentication successful',
            token: token
          });
        }

        return res.status(500).json({message: "Authentication failed"});
      });

    } else {
      console.log(user);
      return res.status(404).json({
        message: 'Authentication failed'
      });
    }
  })
  .catch(err => {
    console.log({error: err});
  })
});

module.exports = router;
