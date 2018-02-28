//save and require sql & inquirer npm's
const inquirer = require("inquirer");
const mysql = require("mysql");

//connect to database then....connection configuration
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: " ",
    database: "bamazon_db"
});

//now need connection execution
connection.connect(function(err) {
    if (err) throw err;
    start();
});

//quieres to get the data then, get data
//display all items for sale
function start(){
    connection.query("SELECT * FROM products", function(err,results){
        if (err) throw err;
        console.log(results);  //returns an array of objects
        questions();
    })
}
//prompt users with 2 messages - with inquirer:
// 1. Ask for ID of product they want
// 2. Ask how many units they want
function questions(){
    inquirer
    .prompt([  //prompt method returns a promise, kind of like a callback
        {
            name: "id",
            type: "input", //input is the default, but leaving here so I'll know
            message: "What is the ID number of the product you want to buy?"
        },
        {
            name: "units",
            type: "input",
            message: "How many units do you want to buy?"
        },
     ])
     .then(function(answer){
         console.log(answer);  //returns an object
         
     })
    };

//once order is placed app checks if store has enough of that product to meet customer's request
// - if not, log 'insufficient quantity'
// - if it does, fulfill the order

// to fullfill the order, means to:
// 1. update sql database to reflect remaining quantity
// 2. after the update, show user their total cost of purchase
