drop database if exists bamazon_db;
create database bamazon_db;

use bamazon_db;

create table products (
    -- item_id, unique for each product
    id integer auto_increment not null,
    -- product (create ~10 products)
    product varchar (50) not null,
    -- department
    department varchar (50) not null,
    -- price (cost to customer)
    price decimal (10,2) not null,
    -- quantity (how many avaiable in store)
    quantity integer (100) not null,
    primary key (id)
);

insert into products (product, department, price, quantity)
values ("mc hammer cd", "music", 5.00, 25);

insert into products (product, department, price, quantity)
values ("lemon essential oil", "health & beauty", 14.05, 100);

insert into products (product, department, price, quantity)
values ("hydro flask", "camping", 24.95, 54);


    
select * from products;

   

