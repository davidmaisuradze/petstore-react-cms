import React from 'react';
import moment from 'moment';

import {getFormDataValues, getFormElementsArray, updateFormOnChange, updateObject} from "../../shared/utility";
import Input from "../UI/Input/Input";

class DynamicForm extends React.Component {
    state = {formControls: {}};

    static getDerivedStateFromProps(nextProps, prevState) {
        const nextFormControls = nextProps.formControls;
        const nextFormControlKeys = Object.keys(nextFormControls);
        let initialState = nextFormControlKeys.reduce((formControl, key) => {
            // default values, passed as props from parent
            const defaultValue = nextProps.defaultValues ? nextProps.defaultValues[key] : null;
            // previous controls
            const prevFormControl = prevState.formControls[key];
            // next controls
            const nextFormControl = nextProps.formControls[key];
            // value type. at this moment, it should be text, number, select, checkbox, radio, date
            const valueType = nextFormControl.type;

            // if valueType is date, we have to initialize it with moment(), otherwise just an empty string
            let value = defaultValue ? defaultValue : valueType === 'date' ? moment() : '';

            // if we just reopened
            if (prevFormControl && prevFormControl.value) {
                value = prevFormControl.value;
            } else if (valueType === 'select' && nextFormControl.options && nextFormControl.options.length) {
                value = nextFormControl.options[0].value;
            }

            formControl[key] = {
                value: value,
                errors: prevFormControl && prevFormControl.errors ? prevFormControl.errors : [],
                isTouched: !!value,
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
    };

    render() {
        const formElementsArray = getFormElementsArray(this.props.formControls);

        const form = formElementsArray.map(formElement => (
            <Input
                key={formElement.key}
                options={formElement.config.options}
                itemKey={formElement.key}
                elemType={formElement.config.type}
                shouldValidate={formElement.config.validators}
                errorMessages={formElement.config.errorMessages}
                label={formElement.config.label}
                value={this.state.formControls[formElement.key].value}
                errors={this.state.formControls[formElement.key].errors}
                touched={this.state.formControls[formElement.key].isTouched}
                show={this.state.formControls[formElement.key].show}
                changed={e => this.onChange(e, formElement.key, formElement.config.type)}
            />
        ));

        return (
            <>
                {this.props.formTitle ? (
                    <h2 className="auth-section__heading-secondary text-center">{this.props.formTitle}</h2>) : null}

                <form onSubmit={e => this.onSubmit(e)}>
                    {form}
                    <div>
                        <button type="submit" className="btn btn-auth">Submit</button>
                    </div>
                    {this.props.children}
                </form>
            </>
        );
    }
}

export default DynamicForm;
