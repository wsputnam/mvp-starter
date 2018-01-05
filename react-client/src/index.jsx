import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import axios from 'axios';

var items = [{"id":38713,"dialogue":false,"private":false,"tags":["love"],"url":"https://favqs.com/quotes/friedrich-nietzsche/38713-there-is-alwa-","favorites_count":1,"upvotes_count":1,"downvotes_count":0,"author":"Friedrich Nietzsche","author_permalink":"friedrich-nietzsche","body":"There is always some madness in love. But there is also always some reason in madness.", starred: false}, {"id":27654,"dialogue":false,"private":false,"tags":["good","wisdom"],"url":"https://favqs.com/quotes/francois-de-la-rochefoucauld/27654-few-people-ha-","favorites_count":1,"upvotes_count":1,"downvotes_count":0,"author":"Francois de La Rochefoucauld","author_permalink":"francois-de-la-rochefoucauld","body":"Few people have the wisdom to prefer the criticism that would do them good, to the praise that deceives them.", starred: false}]

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
    this.setState({
      selected: clicked
    })
  }
  starQuote() {
    // hello
  }
  addQuote(e) {
    event.preventDefault();
    axios.post('/items', [{author: 'Ace White', body: this.added.value}])
    .then(res => {
      this.setState({
        items: [{author: 'Ace White', body: this.added.value}, ...this.state.items]
      });
    })
    .catch(error => {
      console.log('adding error', error);
    })
    // })
    // this.setState({
    //   items: [{author: 'Ace White', body: this.added.value, starred: false}, ...this.state.items]
    // });
  }
  searchQuotes(e) {
    event.preventDefault();
    console.log('author should be here', this.added.value)
    axios.get('/search')
      .then(res => {
        var arr = [];
        for (var i = 20; i < res.data.length; i++) {
          // console.log('response', res.data[0].author)
          if (res.data[i].author !== undefined && res.data[i].author.toLowerCase() === this.added.value.toLowerCase() && arr.includes(res.data[i]) === false) {
            arr.push(res.data[i]);
          }
        }
        this.setState({items: arr});
      })
      .catch(error => {
        console.log('search error', error);
      })
  }
  loadAll() {
    axios.get('/load')
     .then(res => {
       this.setState({items: res.data.slice(19)});
     })
     .catch(error => {
        console.log('did mount error', error);
     });
  }
  componentWillMount() {
    axios.get('/items')
    .then(res => {
      // console.log('Here is data', res.data);
      this.setState({items: JSON.parse(res.data).quotes});
    })
    .catch(error => {
      console.log('error', error);
    });
  }
  componentDidMount() {
    axios.get('/load')
     .then(res => {
      console.log('res', res.data)
       this.setState({items: res.data.slice(res.data.length - 10)});
     })
     .catch(error => {
        console.log('did mount error', error);
     });
  }
  render () {
    return (<div id="rendered">
      <h1>{this.state.selected.body}</h1>
      <h2>{this.state.selected.author}</h2>
      <button onClick={(e)=>{this.searchQuotes(e)}}>Search</button>
      <input ref={(input) => {this.added = input}} type="text" /><button onClick={(e) => this.addQuote(e)}>Add a quote</button>
      <button onClick={(e)=> {this.loadAll()}}>Load All Quotes</button>
      <List dailyQuote={this.dailyQuote} items={this.state.items}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));