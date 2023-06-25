//--------------

module.exports = app => {
    //#import all logics (methods) from the controller.js
    const categories = require("../controllers/category.controller.js");

    //#create an instance of a router object
    var router = require("express").Router();
  
    //#Create a new Product
    router.post("/", categories.create);
  
    //#Retrieve all Products
    router.get("/", categories.findAll);
    //(npp)

    //#Retrieve a single Product with id
    router.get("/:id", categories.findOne);

    //#Update a Product with id
    router.put("/:id", categories.update);

    //#Delete a Product with id
    router.delete("/:id", categories.delete);

    //#Delete all Products
    router.delete("/", categories.deleteAll);

    //#req to the '/api/products' directory will be handled by router
    app.use('/api/categories', router);
  };