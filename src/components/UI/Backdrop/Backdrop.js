import React from 'react';

const Backdrop = props => (
    <div className={'modal-backdrop fade ' + (props.show ? 'show' : 'd-none')} />
);

export default Backdrop;