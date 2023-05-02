import express from 'express';
import path from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';

import {getUser} from './database.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"))
app.get('/', async (req,res) => {
    res.sendFile(path.join(__dirname, "public", 'views', "index.html"))
    // res.send(path.join("hello"))
})

app.post('/submit', async (req,res) => {
    console.log(req.body);
    const user = await getUser(req.body);
    // console.log(user)
    res.send(user)
    // res.send(path.join("hello"))
})
 
app.listen(3000)