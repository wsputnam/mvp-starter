import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';

var items = [{"qotd_date":"2018-01-05T00:00:00.000+00:00","quote":{"id":38713,"dialogue":false,"private":false,"tags":["love"],"url":"https://favqs.com/quotes/friedrich-nietzsche/38713-there-is-alwa-","favorites_count":1,"upvotes_count":1,"downvotes_count":0,"author":"Friedrich Nietzsche","author_permalink":"friedrich-nietzsche","body":"There is always some madness in love. But there is also always some reason in madness."}}];
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: [{"qotd_date":"2018-01-05T00:00:00.000+00:00","quote":{"id":38713,"dialogue":false,"private":false,"tags":["love"],"url":"https://favqs.com/quotes/friedrich-nietzsche/38713-there-is-alwa-","favorites_count":1,"upvotes_count":1,"downvotes_count":0,"author":"Friedrich Nietzsche","author_permalink":"friedrich-nietzsche","body":"There is always some madness in love. But there is also always some reason in madness."}}],
      selected: this.state.items[0]
    }
    this.dailyQuote = this.dailyQuote.bind(this);
  }
  dailyQuote(clicked) {
    this.state.selected = clicked;
  }
  componentDidMount() {
    $.ajax({
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
      <h1>{this.state.selected.quote.body} {this.state.selected.quote.author}</h1>
      <List dailyQuote={this.dailyQuote} items={this.state.items}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));