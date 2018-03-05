//save and require sql & inquirer npm's
const inquirer = require("inquirer");
const mysql = require("mysql");

//connect to database...this is connection configuration
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "amy",
    password: "Password",
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
    
    ]).then(function(answer){
        //console.log("Your Order: ", answer);

        var userId = answer.id;
        console.log("Chosen Item ID: ", userId);

        var userQuantity = answer.quantity;
        console.log("Quantity Requested: ", userQuantity, "\n");

        connection.query("SELECT * FROM products WHERE ?", [{ id: answer.id }], function(err,results){
            if (err) throw err;
            var currentQuantity = results[0].quantity;
            console.log("Current Quantity in Stock: ", currentQuantity);
            var price = results[0].price;
            var remainingQuantity = currentQuantity - answer.quantity;
            console.log("Remaining quantity now in stock: ", remainingQuantity);
        })
    })
})

}

//need to make it update the database
//need to give the total price to the user



        
      