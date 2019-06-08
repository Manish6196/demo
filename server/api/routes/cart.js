const express = require("express");
const router = express.Router();
const CartController = require('../controllers/cart');
// const checkAuth = require('../middleware/check-auth');

router.post("/", CartController.create_cart); //checkAuth, 

router.post("/get", CartController.get_a_cart); //checkAuth

router.post("/item/delete", CartController.cart_item_delete);

module.exports = router;