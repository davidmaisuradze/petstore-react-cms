import React from 'react';
import {Route, Redirect} from "react-router-dom";

const GuardedRouteWithLayout = ({component: Component, layout: Layout, isAuthenticated, ...rest}) => {
    console.log(isAuthenticated, 'isAuthenticated');
    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated ? <Layout><Component {...props}/></Layout> : <Redirect to='/signin'/>
            }
        />
    );
};

export default GuardedRouteWithLayout;
