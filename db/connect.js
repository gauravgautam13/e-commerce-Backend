const mongoose = require("mongoose");


const connectDB = (uri) => {
    console.log("succesfully conneted");
    return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
}

module.exports = connectDB;