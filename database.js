import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config()

const pool = mysql.createPool({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
}).promise()

export async function getUser(reqBody) {
    console.log(reqBody)
    console.log(reqBody.email)
    console.log(reqBody.password)
    const email = reqBody.email;
    const password = reqBody.password

    console.log(typeof(email))
    console.log(typeof(password))
//     const query = 
//     `SELECT 
//         u.fname, u.lname, u.email, u._password, u.ssn
//     FROM 
//         sqli.users as u
//     WHERE 
//         email = ?`
       
//    console.log(query)
//     const [rows] = await pool.query(query,[email]); 

    const [rows] = await pool.query(
        `
        SELECT 
            u.fname, u.lname, u.email, u._password, u.ssn
        FROM 
            sqli.users as u
        WHERE 
            email = '${email}'
         AND 
            _password = '${password}';
        `);  
    console.log(rows)
    return rows; 
}