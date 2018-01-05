var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var quoteSchema = mongoose.Schema({
  author: String,
  body: String,
  starred: Boolean
});

var Quote = mongoose.model('Quote', quoteSchema);

var saveQuotes = function(data, res) {
  var quotes = JSON.parse(data).quotes;
  quotes.forEach(function(quote) {
    // console.log('here is data from db', quote);
    new Quote({author: quote.author, body: quote.body, starred: false})
    .save(function(err) {
      if (err) {
        res.statusCode(404);
        res.end(err);
      }
    });
    // console.log('quote saved to db', Quote);
  });
};
var selectAll = function(callback) {
  console.log('here is quote', Quote);
  Quote.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};


module.exports.saveQuotes = saveQuotes;
module.exports.selectAll = selectAll;