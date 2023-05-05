import express from 'express';
import path from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import fs from 'fs'
import crypto from 'crypto';

import {getUser} from './database.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"))
app.get('/', async (req,res) => {
    // Logs requests into file called default_route.txt
    let time = new Date()
    let ip = req.ip;
    let protocol = req.protocol
    let method = req.method
    let data = `${time}, ${ip}, ${protocol}, ${method} \n`;
    fs.appendFile('default_route.txt',data, (err) => {if (err) throw err})
    // Serves the login page to user
    res.sendFile(path.join(__dirname, "public", 'views', "index.html"))
})

app.post('/submit', async (req,res) => {
    console.log(req.body);
    // Logs requests into file called form_log.txt
    let time = new Date()
    let ip = req.ip;
    let protocol = req.protocol
    let method = req.method
    let email_field = req.body.email;
    let password_field = crypto.createHash('sha512').update(req.body.password).digest('hex');
    let data = `${time}, ${ip}, ${protocol}, ${method}, ${email_field}, ${password_field} \n`;
    fs.appendFile('form_log.txt',data, (err) => {if (err) throw err})
    // Makes a request to the database
    const user = await getUser(req.body);
    res.send(user)
})

app.listen(3000)