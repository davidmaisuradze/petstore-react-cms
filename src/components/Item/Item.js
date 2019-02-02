import React from 'react';

const Item = (props) =>(
    <div className='item'>
        <p><strong>{props.category}: </strong>{props.name}</p>
    </div>
);

export default Item;