require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const PORT = process.env.PORT || 5000;
const productRoute = require("./routes/product");
const userRoute = require("./routes/user");
const cors = require("cors");
app.use(cors());


app.use(express.json());


app.get("/", (req, res) => {
    res.send("hello world, i'm coming");
});

app.use("/api/product", productRoute);
app.use("/api/user", userRoute);

const start = async () =>{
    try {
         await connectDB(process.env.MONGODB_URL);
        app.listen(PORT, async () =>{
           
            console.log(`${PORT} is running`);
        })
        
    } catch (error) {
        console.log(error);
        
    }
}

start();