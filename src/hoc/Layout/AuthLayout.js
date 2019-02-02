import React from 'react';

const AuthLayout = (props) => (
    <div className='d-flex justify-content-center align-items-center'>
        <main className='main-content bgc-grey-100 col-md-4'>
            {props.children}
        </main>
    </div>
);

export default AuthLayout;
