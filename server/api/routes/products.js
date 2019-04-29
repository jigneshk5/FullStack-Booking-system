const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//var Room = mongoose.model('Rooms');
const Product = require("../models/product");
router.get("/", (req, res, next) => {
  // Room.find({}, function(err, task) {
  //   if (err)
  //     res.send(err);
  //   res.json(task);
  // });
  Product.find()
    .exec()
    .then(docs => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", (req, res, next) => {
  var new_room = new Product(req.body);
  new_room.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
});

router.delete("/:roomId", (req, res, next) => {
  const id = req.params.roomId;
  Product.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
