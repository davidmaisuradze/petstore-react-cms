import React from 'react';
import {Route, Redirect} from "react-router-dom";
import {connect} from 'react-redux';

class GuardedRouteWithLayout extends React.Component {
    render() {
        console.log(this.props.isAuthenticated, 'isAuthenticated');
        return (
            <Route
                {...this.props.rest}
                render={props =>
                    this.props.isAuthenticated ?
                        <this.props.layout>
                            <this.props.component {...props}/>
                        </this.props.layout> : <Redirect to={'/signin?returnUrl=' + this.props.location.pathname}/>
                }
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: !!state.auth.token
    }
};

export default connect(mapStateToProps, null)(GuardedRouteWithLayout);
