//save and require sql & inquirer npm's
const inquirer = require("inquirer");
const mysql = require("mysql");

//connect to database...this is connection configuration
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

//quieres to get the data and then,
//display the data, calling function to ask questions
function start(){
    connection.query("SELECT * FROM products", function(err,results){
        if (err) throw err;
        //console.log(results);  //returns an array of objects
        console.log("\n--------- WELCOME TO BAMAZON -----------\n");
        for (i = 0; i < results.length; i++){
            console.log("ID: " + results[i].id + "   Product: " + results[i].product + "   Price: $" + results[i].price);
        }
        questions();
    })
};

//prompt users with 2 messages - with inquirer:
// 1. Ask for ID of product they want
// 2. Ask how many units they want
function questions(){
    connection.query("SELECT * FROM products", function(err, results){

    inquirer
    .prompt([  //prompt method returns a promise, kind of like a callback. 
        //have to have at least name and message.
        {
            name: "id",
            type: "input", //input is the default type
            message: "What is the ID number of the product you want to buy?"
        },
        {
            name: "quantity",
            type: "input",
            message: "How many units do you want to buy?"
        }
    
    ])
    })
};
   // .then(function(answer){
        //if answer is a valid id number, continue to q 2)

        // if quantitly is valid number, return product name, how many they want to order and the total price

        
        //else 'not a valid id number'
