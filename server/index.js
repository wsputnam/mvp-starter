var express = require('express');
var bodyParser = require('body-parser');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
var database = require('../database-mongo');

var app = express();
var axios = require('axios');
var request = require('request');
var config = require('./config.js');

var options = {
	'url': ` https://favqs.com/api/quotes/`,
	 'headers': {
	 	'Content-Type': 'application/json',
	 	'Authorization': `Token token=${config.TOKEN}`
	 }
}


var items = [{"id":38713,"dialogue":false,"private":false,"tags":["love"],"url":"https://favqs.com/quotes/friedrich-nietzsche/38713-there-is-alwa-","favorites_count":1,"upvotes_count":1,"downvotes_count":0,"author":"Friedrich Nietzsche","author_permalink":"friedrich-nietzsche","body":"There is always some madness in love. But there is also always some reason in madness."}, {"id":27654,"dialogue":false,"private":false,"tags":["good","wisdom"],"url":"https://favqs.com/quotes/francois-de-la-rochefoucauld/27654-few-people-ha-","favorites_count":1,"upvotes_count":1,"downvotes_count":0,"author":"Francois de La Rochefoucauld","author_permalink":"francois-de-la-rochefoucauld","body":"Few people have the wisdom to prefer the criticism that would do them good, to the praise that deceives them."}, {
    "author": "Mark Twain",
    "body": "Never let your schooling interfere with your education."
}];
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../react-client/dist'));


app.post('/items', function(req, res) {
      
  	  database.saveAQuote(req, res);
  	  res.json();
});
app.get('/items', function (req, res) {
      request(options, function(error, response, body) {
        if (error) {
        	throw error;
        }
        // console.log('here is res', response);
        // console.log('here is body', body);
        // let data = JSON.parse(response);
        database.saveQuotes(body, res);
        res.json(body);
      });  
});

app.get('/load', function (req, res) {
  database.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.get('/search', function(req, res) {
	database.selectAll(function(err, data) {
		if (err) {
			res.sendStatus(500);
		} else {
			// console.log('data from search', data);
			res.json(data);
		}
	});
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

module.exports = app;
