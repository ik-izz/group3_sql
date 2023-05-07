import mysql from 'mysql2';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config()
// Creates pool for connections
const pool = mysql.createPool({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
}).promise()
// Requests user info from database using the email and hashed password as parameters
export async function getUser(reqBody) {
    const email = reqBody.email;
    const password = crypto.createHash('sha512').update(reqBody.password).digest('hex');
    // query without vulnerability
//     const query = 
//     `SELECT 
//         u.fname, u.lname, u.email, u._password, u.ssn
//     FROM 
//         sqli.users as u
//     WHERE 
//         email = ?
//     AND 
//         _password = ?
//      `
//    console.log(query)
//     const [rows] = await pool.query(query,[email,password]); 

    // Query with vulnerability 
    const query =
    `
    SELECT 
        u.fname, u.lname, u.email, u._password, u.ssn
    FROM 
        sqli.users as u
    WHERE 
        email = '${email}'
     AND 
        _password = '${password}';
    `
    console.log(query)
    const [rows] = await pool.query(query);  
    console.log(rows)
    return rows; 
}