import React from 'react';

const Loader = () => (
    <div className='loader-container vh-100 w-100 d-flex justify-content-center align-items-center'>
        <div className="lds-roller">
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
        </div>
    </div>
);

export default Loader;