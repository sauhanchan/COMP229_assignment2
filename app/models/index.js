//--------------

const dbConfig = require("../config/db.config.js");  
const mongoose = require("mongoose");

//#sets the Mongoose promise library to the global promise library. 
mongoose.Promise = global.Promise;

//#An empty object called 'db' is created to store various properties related to the database configuration
const db = {};  

db.mongoose = mongoose;
db.url = dbConfig.url;

//#Defines the product schema and returns a Mongoose model for the "products" collection
db.products = require("./product.model.js")(mongoose);    

//#Defines the category schema and returns a Mongoose model for the "categories" collection
db.categories = require("./category.model.js")(mongoose);

module.exports = db;