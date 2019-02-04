import React from 'react';

const Attributes = props => (
    <ul>
        {props.attributes.map(item => (
            <li>{item.value}</li>
        ))}
    </ul>
);

export default Attributes;