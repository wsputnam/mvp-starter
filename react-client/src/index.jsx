import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: [{"qotd_date":"2018-01-05T00:00:00.000+00:00","quote":{"id":38713,"dialogue":false,"private":false,"tags":["love"],"url":"https://favqs.com/quotes/friedrich-nietzsche/38713-there-is-alwa-","favorites_count":1,"upvotes_count":1,"downvotes_count":0,"author":"Friedrich Nietzsche","author_permalink":"friedrich-nietzsche","body":"There is always some madness in love. But there is also always some reason in madness."}}, {"qotd_date":"2018-01-05T00:00:00.000+00:00","quote":{"id":27654,"dialogue":false,"private":false,"tags":["good","wisdom"],"url":"https://favqs.com/quotes/francois-de-la-rochefoucauld/27654-few-people-ha-","favorites_count":1,"upvotes_count":1,"downvotes_count":0,"author":"Francois de La Rochefoucauld","author_permalink":"francois-de-la-rochefoucauld","body":"Few people have the wisdom to prefer the criticism that would do them good, to the praise that deceives them."}}]
    }
    this.selected = this.state.items[0]
    this.dailyQuote = this.dailyQuote.bind(this);
    this.addQuote = this.addQuote.bind(this);
  }
  dailyQuote(clicked) {
    this.selected = clicked;
  }
  addQuote(event) {
    event.preventDefault();
    var newItem = {};
    newItem.quote = {};
    if (event.key === 'Enter') {
      this.setState({
        items: [{quote: {author: 'yo yo', body: event.target.value}}, ...this.state.items]
      });
    }
  }
  componentDidMount() {
    $.ajax({
      method: 'GET',
      url: '/items', 
      success: (data) => {
        this.setState({
          items: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  render () {
    return (<div>
      <h1>{this.selected.quote.body} {this.selected.quote.author}</h1>
      <List addQuote={this.addQuote} dailyQuote={this.dailyQuote} items={this.state.items}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));