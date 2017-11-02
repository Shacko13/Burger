// Import the ORM to create functions that will interact with the database.
var orm = require('../config/orm.js');

var burgers = {
	all: function(cb) {
    orm.all('burgers', function(res) {
      cb(res);
    });
  },

    // The variables cols and vals are arrays
    insertOne: function(cols, vals, cb) {
    orm.insertOne('burgers', cols, vals, function(res) {
      cb(res);
    });
  },

    updateOne: function(objColVals, condition, cb) {
      var condition = 'id = ' + condition;
      var objColValsObject = {devoured: objColVals};
      orm.updateOne('burgers', objColValsObject, condition, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (burgerController.js).
module.exports = burgers;