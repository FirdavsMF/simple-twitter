// const express = require("express");
// const app = express();
const mysql = require("mysql");


const db = mysql.createConnection({
    // user: "root",
    // host: "localhost:27015",
    // password: "",
    // database: "employeeSystem",
    host: "localhost",
    user: "root",
    database: "employeeSystem",
    password: "root"
});

db.connect(err => {
    if (err) {
        console.log(err);
        return err;
    } else {
        console.log('connected')
    }
})

let query = "SELECT * FROM posts";

db.query(query, (err, result, field) => {
    console.log(result);
    console.log(err)
})