import React from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';

import {getFormDataValues, getFormElementsArray, updateFormOnChange, updateObject} from "../../shared/utility";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";

class DynamicForm extends React.Component {
    state = {formControls: {}};

    static getDerivedStateFromProps(nextProps, prevState) {
        const nextFormControls = nextProps.formControls;
        const nextFormControlKeys = Object.keys(nextFormControls);
        let initialState = nextFormControlKeys.reduce((formControl, key) => {
            // default values, passed as props from parent
            const defaultValue = nextProps.formDefaultValues ? nextProps.formDefaultValues[key] : null;
            // previous controls
            const prevFormControl = prevState.formControls[key];
            // next controls
            const nextFormControl = nextProps.formControls[key];
            // value type. at this moment, it should be text, number, select, checkbox, radio, date
            const valueType = nextFormControl.type;

            // if valueType is date, we have to initialize it with moment(), otherwise just an empty string
            let value = '';

            if (defaultValue !== null) {
                value = defaultValue;
            } else if (prevFormControl && prevFormControl.value) {
                value = prevFormControl.value;
            } else if (valueType === 'date') {
                value = moment();
            }

            const errors = prevFormControl && prevFormControl.errors ? prevFormControl.errors : [];
            formControl[key] = {
                value: value,
                errors: errors,
                isTouched: errors.length,
                show: true
            };
            return formControl;
        }, {});

        // in DynamicForms I have the following feature: specific control's visibility could be depended on another
        // control's value. if you want to do this, you have to specify showDepended:{target(controlName), value(desiredValue)}
        // property in parent component's formControl. Here, DynamicForms will get all these showDepended controls, check their
        // visibility status with target value and updates 'show' property accordingly
        const showDependedControls = nextFormControlKeys.filter(x => nextFormControls[x].showDepended);
        showDependedControls.forEach(controlKey => {
            const showDepended = nextFormControls[controlKey].showDepended;
            initialState[controlKey] = updateObject(initialState[controlKey], {
                show: initialState[showDepended.target].value === showDepended.value
            });
        });

        const stateData = {formControls: initialState};
        nextProps.onSetFormDefaultValues();
        return {
            ...stateData
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        const formData = getFormDataValues(this.state.formControls);
        this.props.onSubmit(formData);
    };

    onChange = (e, key, type) => {
        const value = type === 'date' ? e : e.target.value;
        const updatedControls = updateFormOnChange(this.state.formControls, this.props.formControls, value, key, type);
        this.setState({formControls: updatedControls});
        if (this.props.onChange) {
            this.props.onChange(e);
        }
    };

    render() {
        const formElementsArray = getFormElementsArray(this.props.formControls);

        const form = formElementsArray.map(formElement => (
                <Input
                    key={formElement.key} // key for React
                    options={formElement.config.options} // options array, if type is select
                    itemKey={formElement.key} // key
                    elemType={formElement.config.type} // type
                    shouldValidate={formElement.config.validators} // validators array
                    errorMessages={formElement.config.errorMessages} // errorMessages array
                    label={formElement.config.label} // label
                    value={this.state.formControls[formElement.key].value} // value
                    errors={this.state.formControls[formElement.key].errors} // errors array
                    touched={this.state.formControls[formElement.key].isTouched} // is touched or not, boolean value
                    show={this.state.formControls[formElement.key].show} // show or not, boolean value
                    changed={e => this.onChange(e, formElement.key, formElement.config.type)} // onChange handler function
                />
            ));

        return (
            <>
                {this.props.formTitle ? (
                    <h2 className="auth-section__heading-secondary text-center">{this.props.formTitle}</h2>) : null}

                <form onSubmit={e => this.onSubmit(e)}>
                    {form}
                    {this.props.children}
                    <div className={'mt-3 d-flex'}>
                        <button type="submit" className="btn btn-success">Submit</button>
                        {/*if form is opened inside modal*/}
                        {
                            this.props.onModalClose ? (
                                <Button aclass={'btn-secondary ml-1'}
                                        clicked={this.props.onModalClose}>Close</Button>) : null
                        }
                    </div>
                </form>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        formDefaultValues: state.global.formDefaultValues,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSetFormDefaultValues: (payload = null) => dispatch(actions.setFormDefaultValues(payload))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DynamicForm);
