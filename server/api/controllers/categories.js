const mongoose = require("mongoose");
const Category = require("../models/category");

exports.categories_create_category = (req, res, next) => {
      console.log(JSON.stringify(req.files))
      const category = new Category({
      _id: new mongoose.Types.ObjectId(),
      category: req.body.category 
    });
    category
      .save()
      .then(result => {
        console.log(result);
        res.status(201).json({
            _id: result._id,
            category: result.category
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };

  exports.categories_get_all = (req, res, next) => {
    Category.find({})
      .select("_id category")
      .exec()
      .then(docs => {
        const response = {
          categories: docs.map(doc => {
            return {
              category: doc.category,
              _id: doc._id
            };
          })
        };
        res.status(200).json(response);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };