var express = require('express');
var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burgers = require('../models/burger.js');

// Routes
router.get('/', function(req, res) {
  res.redirect('/burgers');
});

router.get('/burgers', function(req, res) {
  burgers.all(function(data) {
    res.render('index', {burgers: data});
  });
});

router.post('/burgers/insertOne', function(req, res) {
  burgers.insertOne([
    'burger_name'
  ], [
    req.body.burger
  ], function() {
    res.redirect('/burgers');
  });
});

router.put('/burgers/updateOne/:id', function(req, res) {

  burgers.updateOne(req.body.devoured, req.params.id, function() {
    res.redirect('/burgers');
  });
});

router.get('/', function(req, res){res.send('This worked!!');});

// Export routes for server.js to use.
module.exports = router;