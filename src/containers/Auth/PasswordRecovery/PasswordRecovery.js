import React, {Component} from 'react';
import {getFormElementsArray, updateFormOnChange} from "../../../shared/utility";
import Input from "../../../components/UI/Input/Input";

class PasswordRecovery extends Component {
    state = {
        formControls: {
            email: {
                label: 'Email',
                type: 'text',
                value: '',
                validators: {required: true, email: true},
                errorMessages: {required: 'required', email: 'invalid format'},
                errors: [],
                isTouched: false
            },
            newPassword: {
                label: 'New Password',
                type: 'password',
                value: '',
                validators: {required: true, minLength: 6},
                errorMessages: {required: 'required', minLength: 'mininum 6 characters'},
                errors: [],
                isTouched: false
            },
            confirmNewPassword: {
                label: 'Confirm Password',
                type: 'password',
                value: '',
                validators: {required: true, equalTo: 'newPassword'},
                errorMessages: {required: 'required', equalTo: 'passwords not match'},
                errors: [],
                isTouched: false
            }
        }
    };

    onSubmit = e => {
        e.preventDefault();
        console.log(this.state, 'passwordRecoveryState');
    };

    onChange = (e, key) => {
        const updatedControls = updateFormOnChange(this.state.formControls, e.target.value, key);
        this.setState({formControls: updatedControls});
    };

    goBack = () => {
        this.props.history.goBack();
    };

    render() {
        const formElementsArray = getFormElementsArray(this.state.formControls);

        const form = formElementsArray.map(formElement => (
            <Input
                key={formElement.key}
                options={formElement.config.options}
                itemKey={formElement.key}
                elemType={formElement.config.type}
                value={formElement.config.value}
                shouldValidate={formElement.config.validators}
                errorMessages={formElement.config.errorMessages}
                errors={formElement.config.errors}
                touched={formElement.config.isTouched}
                label={formElement.config.label}
                changed={e => this.onChange(e, formElement.key)}
            />
        ));

        return (
            <>
                <h2 className="auth-section__heading-secondary text-center">Recover Password</h2>
                <form onSubmit={e => this.onSubmit(e)}>
                    {form}
                    <div>
                        <button type="submit" className="btn btn-success">Submit</button>
                        <button type='button' className='btn btn-success' onClick={this.goBack}>Cancel</button>
                    </div>
                </form>
            </>
        );
    }
}

export default PasswordRecovery;