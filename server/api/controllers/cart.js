const mongoose = require("mongoose");
const Cart = require("../models/cart");

exports.get_a_cart = (req, res, next) => {
    // console.log(req.body)
    Cart.findOne({ userId: req.body.userId })
      .populate('products')
      .then(cart => {
        if (!cart) {
                return res.status(404).json({
                    message: "cart not found"
                });
              }
        else {
            // console.log(cart)
            return res.status(201).json({
                cart: cart
            })
        }
      })
  };

  exports.cart_item_delete = (req, res, next) => {
    // console.log(req.body)
    Cart.findOne({ _id: req.body.cartId })
      .then(cart => {
        if (!cart) {
                return res.status(404).json({
                    message: "cart not found"
                });
              }
        else {
            // console.log(cart)
            var index = cart.products.indexOf(req.body.productId);    // <-- Not supported in <IE9
               if (index !== -1) {
                 cart.products.splice(index, 1);
              }
            cart
              .save()
              .then(result => {
                // console.log(result);
                return res.status(201).json({
                    cart: result
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
        }
      })
  };

  exports.create_cart = (req, res, next) => {
    console.log(req.body)
    Cart.findOne({ userId: req.body.userId })
      .then(cart => {
        if (!cart) {
            const cart = new Cart({
                _id: mongoose.Types.ObjectId(),
                userId: req.body.userId,
                products: [ req.body.productId ] 
              });

              cart
              .save()
              .then(result => {
                console.log(result);
                return res.status(201).json({
                    cart: {
                      _id: result._id,
                    userId: result.userId,
                    products: result.products
                    }
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
            }
        else {
            cart.products.push(req.body.productId)
            cart
            .save()
            .then(result => {
              console.log(result);
              res.status(201).json({
                  cart: result
              });
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({
                error: err
              });
            });
            
        }
      })
  };