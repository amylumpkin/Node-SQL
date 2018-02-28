//save and require sql & inquirer npm's
const inquirer = require("inquirer");
const mysql = require("mysql");

//connect to database...this is connection configuration
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: " ",
    password: " ",
    database: "bamazon_db"
});

//now need connection execution
connection.connect(function(err) {
    if (err) throw err;
    start();
});

//quieres to get the data and then,
//display the data
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
    .prompt([  //prompt method returns a promise, kind of like a callback. 
        //have to have at least name and message.
        {
            name: "id",
            type: "input", //input is the default, but leaving here so I'll know for future reference
            message: "What is the ID number of the product you want to buy?"
        },
        {
            name: "units",
            type: "input",
            message: "How many units do you want to buy?"
        },
     ])
     .then(function(answer){
         console.log(answer);  //returns an object...ex) { id: '3', units: '20 }
         //if they want more than what we have in stock, return 'insufficient quantity'
         // call notEnough()

         // else, call totalPrice()
     })
    };


//functions for responses:
//once order is placed app checks if store has enough of that product to meet customer's request
// - if not, log 'insufficient quantity'
function notEnough(){

}
// - if it does, fulfill the order, give the total price
function totalPrice(){

}



// to fullfill the order, means to:
// 1. update sql database to reflect remaining quantity
// 2. after the update, show user their total cost of purchase
