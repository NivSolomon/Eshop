import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import User from "./models/User.js";
import dotenv from "dotenv";
import seedRouter from "./routes/seedRouter.js";
import productRouter from "./routes/productRouter.js";
import userRouter from "./routes/userRouter.js";

const app = express();
dotenv.config();

app.use(cors()); // does nothing at the moment
app.use(express.json()); // parses JSONs
app.use(express.urlencoded({extended: false})); //this is common practice for urlencoded

const PORT = process.env.PORT || 8080; //make sure that you have a .env file

//routes:
app.use('/api/v1/seed', seedRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);

app.use((err, req, res, next) => {
    res.status(500).send({message: err.message});
});

mongoose.connect(process.env.MONGO_CONNECTION_STRING) //make sure that you have a .env file
.then(() => {
    app.listen(PORT, function(){
        console.log("listening on " + PORT);
    })
}).catch(err => {console.log(err.message);});
