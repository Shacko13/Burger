// Import MySQL connection
var connection = require('../config/connection.js');

// Helper function for SQL syntax
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push('?');
  }

  return arr.toString();
}

// Helper function to generate SQL syntax
function objToSql(ob) {
	var arr = [];

	for (var key in ob) {
		var value = ob[key];
		// Check to skip hidden properties
		if (Object.hasOwnProperty.call(ob,key)) {
		// If string with spaces, add quotations
		if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
			arr.push(key + '=' + ob[key]);
		}
	}

// Translate array of strings to a single comma-separated string
	return arr.toString();
}

// Object for all our SQL statement functions
var orm = {
    all: function(tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },

  // Function to insert one burger into the table
	insertOne: function(table, cols, vals, cb) {
		var queryString = "INSERT INTO " + table;

		queryString += " (";
		queryString += cols.toString();
		queryString += ") ";
		queryString += "VALUES (";
		queryString += printQuestionMarks(vals.length);
		queryString += ") ";

		// console.log(queryString);
		// console.log(vals);

		// Database query
		connection.query(queryString, vals, function(err, result) {
			if (err) {
				throw err;
			}

			cb(result);
		});
	},

	// Function to update one table entry
	updateOne: function(table, objColVals, condition, cb) {
		var queryString = "UPDATE " + table;

		queryString += " SET ";
		queryString += objToSql(objColVals);
		queryString += " WHERE ";
		queryString += condition;

		// console.log(queryString);

		// Perform the database query
		connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}

			// Return results in callback
			cb(result);
		});
	}
};

// Export orm object for model (burger.js)
module.exports = orm;