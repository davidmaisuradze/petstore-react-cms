import React from 'react';

const Button = props => (
    <div className="peer">
        <button type="button" className={'btn cur-p ' + props.aclass} onClick={props.clicked}>{props.children}</button>
    </div>
);

export default Button;
