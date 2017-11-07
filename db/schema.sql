-- Create the database burgers_db and specified it for use.
CREATE DATABASE burgers_db;
USE burgers_db;

-- Create the table plans.
CREATE TABLE burgers
(
id int NOT NULL AUTO_INCREMENT,
burger_name varchar(200) NOT NULL,
devoured BOOL DEFAULT false,
PRIMARY KEY (id)
);