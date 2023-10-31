const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      rating:{
        type: Number,
        default: 4.9,
      },
      image: {
        type: [],
      },
      quantity:{
        type: Number
      },
    });

module.exports = mongoose.model("Product", productSchema);