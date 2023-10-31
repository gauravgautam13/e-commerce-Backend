const express = require("express");
const router = express.Router();
const{getAllProducts} = require("../controllers/product");

router.route("/").get(getAllProducts);

module.exports = router;
