//--------------

module.exports = app => {    
    //#import all logics (methods) from the controller.js
    const products = require("../controllers/product.controller.js");
  
    //#create an instance of a router object
    var router = require("express").Router();
  
    //#Create a new Product
    router.post("/", products.create);
  
    //#Retrieve all Products
    router.get("/", products.findAll);
    //(npp)
  
    //#Retrieve a single Product with id
    router.get("/:id", products.findOne); 
  
    //#Update a Product with id
    router.put("/:id", products.update);    
  
    //#Delete a Product with id
    router.delete("/:id", products.delete);   
  
    //#Delete all Products
    router.delete("/", products.deleteAll); 
  
    //#req to the '/api/products' directory will be handled by router
    app.use('/api/products', router);     
};