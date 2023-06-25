//--------------

const db = require("../models");
const Categories = db.categories;

// 1) Create and Save a new Categories
//    #Send appropriate responses depending on the outcome of the database operation
exports.create = (req, res) => {
  //#Validate request (check the req.body)
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  //#Create a Categories (if req.body.name is not null)
  const category = new Categories({
    name: req.body.name,
  });

  //#Save Categories in the database
  Categories
    .save(category)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the category."
      });
    });
};
//----END of 1----////

// 2) Retrieve all Categories from the database.
exports.findAll = (req, res) => {
   const name = req.query.name;
   var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
   Categories.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories."
      });
    });
};
//----END of 2----////

// 3) Find a single Categories with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Categories.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Categories with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving category with id=" + id });
    });
};
//----END of 3----////

// 4) Update a Categories by the id in the request
exports.update = (req, res) => {

  //#check if the req.body is null
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  //#find that id & update
  const id = req.params.id;

  Categories.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Category with id=${id}. Maybe Categories was not found!`
        });
      } else res.send({ message: "Category was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Category with id=" + id
      });
    });
};
//----END of 4----////

// 5) Delete a Categories with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Categories.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Category with id=${id}. Maybe Category was not found!`
        });
      } else {
        res.send({
          message: "Category was deleted successfully!"
        });
      }
    })

    .catch(err => {
      res.status(500).send({
        message: "Could not delete Category with id=" + id
      });
    });
};
//----END of 5----////

// 6) Delete all Categories from the database.
exports.deleteAll = (req, res) => {
   Categories.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Categories were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all categories."
      });
    });
};
//----END of 6----////(npp)