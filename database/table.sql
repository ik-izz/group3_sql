CREATE DATABASE SQLi;

CREATE TABLE SQLi.users(
	fname varchar(255),
    lname varchar(255),
    email varchar(255),
    _password varchar(255),
    ssn int(9) PRIMARY KEY
);

-- Add data into the table 
INSERT INTO sqli.users (fname,lname,email,_password,ssn) 
VALUES ("Israel", "Klein", "israel@klein.com", "password123", 123456789);

INSERT INTO sqli.users (fname,lname,email,_password,ssn) 
VALUES ("Evelin", "Camilo", "evelin@camilo.com", "admin123", 987654321);

INSERT INTO sqli.users (fname,lname,email,_password,ssn) 
VALUES ("Franco", "Franco", "franco@franco.com", "franco456", 567891234);

INSERT INTO sqli.users (fname,lname,email,_password,ssn) 
VALUES ("Kim", "Kim", "kim@kim.com", "kim123", 543216789);

-- hashes the passwords 
UPDATE sqli.users SET _password = sha2(_password, 512);

-- retrieves all columns/rows from the table 
SELECT * FROM sqli.users;