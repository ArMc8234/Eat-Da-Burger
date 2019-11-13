// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
 // GET route for getting all of the table contents

    app.get("/", function(req, res) {
 // findAll returns all entries for a table when used with no options
    db.Burgers.findAll({}).then(function(dbBurgers) {
// We have access to the table data as an argument inside of the callback function
// return res.json(dbBurgers);
      res.render("index", {burgers: dbBurgers});
      console.log("burgers in DB:", dbBurgers)
    });
  });
// POST route for saving a new table entry
  app.post("/api/burgers", function(req, res) {
// create takes an argument of an object describing the item we want to
// insert into our table. In this case we just we pass in an object with a text
// and complete property (req.body)
    db.Burgers.create({
      title: req.body.order,
      devoured: false
    }).then(function(dbBurgers) {
 // We have access to the new burgers as an argument inside of the callback function
      res.json(dbBurgers);
    })
      .catch(function(err) {
  // Whenever a validation or flag fails, an error is thrown
 // We can "catch" the error to prevent it from being "thrown", which could crash our node app
        res.json(err);
      });
  });

  // DELETE route for deleting table entries. We can get the id of the table row to be deleted from
  // req.params.id
  app.delete("/api/burgers/:id", function(req, res) {
    // We just have to specify which table record we want to destroy with "where"
    db.Burgers.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbBurgers) {
      res.json(dbBurgers);
    });

  });

  // PUT route for updating the database. We can get the updated data to insert from req.body
  app.put("/api/burgers", function(req, res) {

    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.Burgers.update({
      title: req.body.order,
      devoured: req.body.devoured
    }, {
      where: {
        id: req.body.id
      }
    }).then(function(dbBurgers) {
      res.json(dbBurgers);
    })
      .catch(function(err) {
      // Whenever a validation or flag fails, an error is thrown
      // We can "catch" the error to prevent it from being "thrown", which could crash our node app
        res.json(err);
      });
  });
};
