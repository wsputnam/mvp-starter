import React from 'react';

const ListItem = (props) => (
  <div>
    { props.item.quote.body }
    {props.item.quote.author}
    <button onClick={props.dailyQuote}>Select</button>
  </div>
)

export default ListItem;