import React, {Component} from 'react';
import {Link, Redirect} from "react-router-dom";
import {connect} from 'react-redux';

import {loginUser} from "../../../store/actions";
import DynamicForm from "../../../components/DynamicForm/DynamicForm";

class Login extends Component {
    state = {
        formControls: {
            email: {
                label: 'Email',
                type: 'text',
                validators: {required: true, email: true},
                errorMessages: {required: 'required', email: 'invalid format'}
            },
            password: {
                label: 'Password',
                type: 'password',
                validators: {required: true},
                errorMessages: {required: 'required'}
            }
        },
        returnUrl: '/'
    };

    componentDidMount() {
        let search = this.props.location.search;
        let params = new URLSearchParams(search);
        this.setState({returnUrl: params.get('returnUrl')});
    }

    onSubmit = formData => {
        this.props.onLogin(formData.email, formData.password)
            .then(res => {
                //this.props.history.push('/');
            });
    };

    render() {
        return (
            <>
                {this.props.isAuthenticated ? <Redirect to={this.state.returnUrl}/> : null}
                <DynamicForm formControls={this.state.formControls}
                             formTitle={'Login'}
                             onSubmit={model => this.onSubmit(model)}>
                    <p><Link to='/passwordRecovery'>forgot password?</Link></p>
                    <p><Link to='/signup'>or join for free</Link></p>
                </DynamicForm>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: !!state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (email, password) => {
            return new Promise((resolve, reject) => {
                dispatch(loginUser(email, password));

                resolve();
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
