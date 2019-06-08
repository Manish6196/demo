const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
// const Cart = require("../models/cart")

exports.user_signup = (req, res, next) => {
  console.log(req.body)
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      console.log(user)
      if (user.length >= 1) {
        if (user[0].role == 'user') {
          User.findOneAndUpdate({ email: req.body.email }, { "$set": { "role": "instructor" }}).exec(function(err, book){
            if(err) {
                console.log(err);
                res.status(500).send(err);
            } else {
              return res.status(201).json({
                message: "User becomes instructor"
              });
            }
         });
        }else {
          return res.status(409).json({
            message: "User already exists"
          });
        }
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              name: req.body.name,
              email: req.body.email,
              role: req.body.role,
              password: hash
            });
            user
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "User created"
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
    });
};

exports.user_login = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Username or Password incorrect!"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "incorrect password!"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h"
            }
          );
          console.log(token)
          return res.status(200).json({
            message: "Logged in successfully!",
            token: token,
            userId: user[0]._id,
            userName: user[0].name,
            userRole: user[0].role
          });
        }
        res.status(401).json({
          message: "Auth failed"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.user_delete = (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
