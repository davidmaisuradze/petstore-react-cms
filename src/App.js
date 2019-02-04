import React, {Component} from 'react';
import {Switch, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import Layout from './hoc/Layout/Layout';
import AuthLayout from './hoc/Layout/AuthLayout';
import RouteWithLayout from './hoc/Routes/RouteWithLayout';
import GuardedRouteWithLayout from './hoc/Routes/GuardedRouteWithLayout';
import Login from './containers/Auth/Login/Login';
import Register from "./containers/Auth/Register/Register";
import Categories from "./containers/Categories/Categories";
import Shop from "./containers/Shop/Shop";
import PasswordRecovery from "./containers/Auth/PasswordRecovery/PasswordRecovery";
import Loader from "./components/UI/Loader/Loader";
import {LOCALSTORAGE_TOKEN} from "./constants/global.constants";
import axios from "./axios-primary";
import {loginSucceeded} from "./store/actions";
import ErrorMessage from "./components/UI/ErrorMessage/ErrorMessage";
import PropertyAttributes from "./containers/PropertyAttributes/PropertyAttributes";
import Property from "./containers/Properties/Property";

class App extends Component {
    componentDidMount() {
        if (localStorage.getItem(LOCALSTORAGE_TOKEN)) {
            axios.get('/auth/currentUser')
                .then(res => {
                    this.props.onLoginSucceeded(localStorage.getItem(LOCALSTORAGE_TOKEN), res.data.user);
                    console.log(this.props.isAuthenticated, 'isAuthenticated');
                });
        }
    }

    render() {
        const routes = (
            <Switch>
                <GuardedRouteWithLayout path='/shop' exact layout={Layout} component={Shop}/>
                <GuardedRouteWithLayout path='/categories' exact layout={Layout} component={Categories}/>
                <GuardedRouteWithLayout path='/properties' exact layout={Layout} component={Property}/>
                <GuardedRouteWithLayout path='/propertyAttributes' exact layout={Layout}
                                        component={PropertyAttributes}/>
                <RouteWithLayout path='/signin' exact layout={AuthLayout} component={Login}/>
                <RouteWithLayout path='/signup' exact layout={AuthLayout} component={Register}/>
                <RouteWithLayout path='/passwordRecovery' exact layout={AuthLayout} component={PasswordRecovery}/>
                <Redirect to='/shop'/>
            </Switch>
        );

        const loader = this.props.loading ? <Loader/> : null;
        const errorMessage = this.props.error ? <ErrorMessage message={this.props.error}/> : null;

        return (
            <>
                {loader}
                {errorMessage}
                {routes}
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.global.loading,
        error: state.global.error,
        isAuthenticated: !!state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLoginSucceeded: (token, user) => dispatch(loginSucceeded(token, user))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
