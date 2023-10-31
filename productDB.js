require("dotenv").config();
const connectDB = require("./db/connect");
const product = require("./models/product");
const productJson = require("./products.json");
const user = require("./models/user");


const start = async () => {
    try {
       // console.log(process.env.MONGODB_URL)
        await connectDB(process.env.MONGODB_URL);
        await product.deleteMany();
        await product.create(productJson);
        // await user.create({});
        console.log("success")
    } catch (error) {
        console.log(error);
    }
}
start();