import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json()); // parses JSONs
app.use(express.urlencoded({extended: false}));

app.listen(8080, function(){
    console.log('listening on '+ 8080);
});