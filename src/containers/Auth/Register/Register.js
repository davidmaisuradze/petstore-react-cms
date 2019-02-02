import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import * as actions from '../../../store/actions';
import DynamicForm from "../../../components/DynamicForm/DynamicForm";

class Register extends Component {
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
                validators: {required: true, minLength: 6},
                errorMessages: {required: 'required', minLength: 'mininum 6 characters'}
            },
            confirmedPassword: {
                label: 'Confirm Password',
                type: 'password',
                validators: {required: true, equalTo: 'password'},
                errorMessages: {required: 'required', equalTo: 'passwords not match'}
            },
            mobilePhone: {
                label: 'Phone',
                type: 'text',
                validators: {required: true, minLength: 9},
                errorMessages: {required: 'required', minLength: 'minimum 9 symbols'}
            },
            firstName: {
                label: 'Firstname',
                type: 'text',
                validators: {required: true},
                errorMessages: {required: 'required'}
            },
            lastName: {
                label: 'Lastname',
                type: 'text',
                validators: {required: true},
                errorMessages: {required: 'required'}
            },
            birthDate: {
                label: 'Birthdate',
                type: 'date'
            },
            genderId: {
                label: 'Gender',
                type: 'select',
                validators: {required: true},
                errorMessages: {required: 'required'},
                options: [
                    {key: 'empty', label: '', value: ''},
                    {key: 'male', label: 'Male', value: '1'},
                    {key: 'female', label: 'Female', value: '2'}
                ]
            }
        }
    };

    onSubmit = (formData) => {
        console.log(formData, 'formData');
        this.props.onRegister(formData)
            .then(res => {
                //this.props.history.push('/');
            });
    };

    render() {
        console.log(this.props.isAuthenticated, 'registerIsAuthenticated');
        return (
            <>
                {this.props.isAuthenticated ? <Redirect to='/'/> : null}
                <DynamicForm formControls={this.state.formControls}
                             formTitle={'Register'}
                             onSubmit={model => this.onSubmit(model)}>
                    <Link to='/signin'>already have an account?</Link>
                </DynamicForm>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: !!state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onRegister: (payload) => {
            return new Promise((resolve, reject) => {
                dispatch(actions.registerUser(payload));
                resolve();
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
