// Dependencies
var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

var PORT = process.env.PORT || 3000;

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));

// Override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

// Set Handlebars.
var exphbs = require('express-handlebars');
var hbs = require('handlebars');

//app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
  //app.set('views', './views');
app.engine('.handlebars', exphbs({ defaultLayout: 'main', extname: '.handlebars' }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.handlebars');

// Import routes and give the server access to them
var routes = require('./burger/controllers/burgers_controller.js');

app.use('/', routes);

// Initiate listener
app.listen(PORT, function() {
  console.log("Listening on PORT " + PORT);
});