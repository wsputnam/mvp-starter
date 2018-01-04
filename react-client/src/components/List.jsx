import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
    <h4>Become inspired</h4>
    <input type="text" onChange={props.addQuote}/><button onClick={props.addQuote}>Add a quote</button>
    { props.items.map((item, index) => <ListItem dailyQuote={props.dailyQuote} key={index} item={item}/>)}
  </div>
)

export default List;