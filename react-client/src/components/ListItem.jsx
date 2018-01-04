import React from 'react';

const ListItem = (props) => (
  <div>
    { props.item.quote.body }
    {props.item.quote.author}
  </div>
)

export default ListItem;