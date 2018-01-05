import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
    <h2>Become inspired</h2>
    
    { props.items.map((item, index) => <ListItem dailyQuote={props.dailyQuote} key={index} item={item}/>)}
  </div>
)

export default List;