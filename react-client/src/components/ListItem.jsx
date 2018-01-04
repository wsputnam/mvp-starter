import React from 'react';

const ListItem = (props) => (
  <div>
    { props.item.body }
    {props.item.author}
  </div>
)

export default ListItem;