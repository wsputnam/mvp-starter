var express = require('express');
var bodyParser = require('body-parser');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
// var items = require('../database-mongo');

var app = express();
var axios = require('axios');
var request = require('request');
var config = require('./config.js');

var options = {
	'url': ` https://favqs.com/api/quotes/?filter=funny&type=tag`,
	 'headers': {
	 	'Content-Type': 'application/json',
	 	'Authorization': `Token token=${config.TOKEN}`
	 }
}

var items = [{"qotd_date":"2018-01-05T00:00:00.000+00:00","quote":{"id":38713,"dialogue":false,"private":false,"tags":["love"],"url":"https://favqs.com/quotes/friedrich-nietzsche/38713-there-is-alwa-","favorites_count":1,"upvotes_count":1,"downvotes_count":0,"author":"Friedrich Nietzsche","author_permalink":"friedrich-nietzsche","body":"There is always some madness in love. But there is also always some reason in madness."}}, {"qotd_date":"2018-01-05T00:00:00.000+00:00","quote":{"id":27654,"dialogue":false,"private":false,"tags":["good","wisdom"],"url":"https://favqs.com/quotes/francois-de-la-rochefoucauld/27654-few-people-ha-","favorites_count":1,"upvotes_count":1,"downvotes_count":0,"author":"Francois de La Rochefoucauld","author_permalink":"francois-de-la-rochefoucauld","body":"Few people have the wisdom to prefer the criticism that would do them good, to the praise that deceives them."}}, {
  "quote": {
    "author": "Mark Twain",
    "body": "Never let your schooling interfere with your education."
  }
}];
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../react-client/dist'));


app.post('/items', function(req, res) {
  if (err) {
  	res.sendStatus(404);
  } else {
  	res.json(items);
  }
});
app.get('/items', function (req, res) {
      request(options, function(error, response, body) {
        if (error) {
        	throw error;
        }
        // console.log('here is res', response);
        console.log('here is body', body);
        // let data = JSON.parse(response);
        res.json(body);
      });
      // res.json(items);
   
  
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

module.exports = app;
