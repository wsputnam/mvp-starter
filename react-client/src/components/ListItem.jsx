import React from 'react';

const ListItem = (props) => (
  <div>
    <h3>{ props.item.quote.body }</h3>
    <h4 id="author">{props.item.quote.author}</h4>
   
    <button onClick={(e)=>{props.dailyQuote(props.item)}}>Select</button>
  </div>
)

export default ListItem;