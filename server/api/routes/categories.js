const express = require("express");
const router = express.Router();
const CategoriesController = require('../controllers/categories');
const ProductsController = require('../controllers/products');
// const checkAuth = require('../middleware/check-auth');

router.post("/", CategoriesController.categories_create_category);
router.get("/", CategoriesController.categories_get_all);
router.post("/specified", ProductsController.categories_get_category);


module.exports = router;