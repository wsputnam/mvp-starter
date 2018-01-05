var express = require('express');
var bodyParser = require('body-parser');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
// var items = require('../database-mongo');

var app = express();

var items = [{"qotd_date":"2018-01-05T00:00:00.000+00:00","quote":{"id":27654,"dialogue":false,"private":false,"tags":["good","wisdom"],"url":"https://favqs.com/quotes/francois-de-la-rochefoucauld/27654-few-people-ha-","favorites_count":1,"upvotes_count":1,"downvotes_count":0,"author":"Francois de La Rochefoucauld","author_permalink":"francois-de-la-rochefoucauld","body":"Few people have the wisdom to prefer the criticism that would do them good, to the praise that deceives them."}}, {
  "quote": {
    "author": "Mark Twain",
    "body": "Never let your schooling interfere with your education."
  }
}];
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../react-client/dist'));

// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));
app.post('/items', function(req, res) {
  if (err) {
  	res.sendStatus(404);
  } else {
  	res.json(items);
  }
});
app.get('/items', function (req, res) {
 
      res.json(items);
   
  
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

module.exports = app;
