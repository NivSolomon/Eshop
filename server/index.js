import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import User from './models/User.js';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json()); // parses JSONs
app.use(express.urlencoded({extended: false}));
const PORT = process.env.PORT || 8080;

app.post('/addUser',async(req, res)=>{
const {user} = req.body;
const newUser = await User.create(req.body)
res.send(newuser)
});

mongoose.connect(process.env.MONGO_CONECTION_STRING)
.then(()=>{
 app.listen(process.env.PORT, function(){
     console.log('listening on '+ process.env.PORT);
 });

}).catch(err => console.log(err));