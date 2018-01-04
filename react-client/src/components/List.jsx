import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
    <h4>Become inspired</h4>
    { props.items.map(item => <ListItem item={item}/>)}
  </div>
)

export default List;