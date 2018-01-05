import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import axios from 'axios';

var items = [{"qotd_date":"2018-01-05T00:00:00.000+00:00","quote":{"id":38713,"dialogue":false,"private":false,"tags":["love"],"url":"https://favqs.com/quotes/friedrich-nietzsche/38713-there-is-alwa-","favorites_count":1,"upvotes_count":1,"downvotes_count":0,"author":"Friedrich Nietzsche","author_permalink":"friedrich-nietzsche","body":"There is always some madness in love. But there is also always some reason in madness."}}, {"qotd_date":"2018-01-05T00:00:00.000+00:00","quote":{"id":27654,"dialogue":false,"private":false,"tags":["good","wisdom"],"url":"https://favqs.com/quotes/francois-de-la-rochefoucauld/27654-few-people-ha-","favorites_count":1,"upvotes_count":1,"downvotes_count":0,"author":"Francois de La Rochefoucauld","author_permalink":"francois-de-la-rochefoucauld","body":"Few people have the wisdom to prefer the criticism that would do them good, to the praise that deceives them."}}]

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: items,
      selected: items[0],
      added: ''
      
    }
    this.dailyQuote = this.dailyQuote.bind(this);
    this.addQuote = this.addQuote.bind(this);
  }
  dailyQuote(clicked) {
    console.log('this was clicked', clicked);
    this.setState({
      selected: clicked
    })
  }
  addQuote(e) {
    event.preventDefault();
    var newItem = {};
    newItem.quote = {};
      this.setState({
        items: [{quote: {author: 'author unknown', body: this.added.value}}, ...this.state.items]
      });
  }
  componentWillMount() {
    axios.get('/items')
    .then(res => {
      this.setState({items: res.data})
    });
    // $.ajax({
    //   method: 'GET',
    //   url: '/items', 
    //   success: (data) => {
    //     this.setState({
    //       items: res.data
    //     })
    //   },
    //   error: (err) => {
    //     console.log('err', err);
    //   }
    // });
  }

  render () {
    return (<div>
      <h1>{this.state.selected.quote.body}</h1>
      <h2>{this.state.selected.quote.author}</h2>
      <input ref={(input) => {this.added = input}} type="text" /><button onClick={(e) => this.addQuote(e)}>Add a quote</button>
      <List dailyQuote={this.dailyQuote} items={this.state.items}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));