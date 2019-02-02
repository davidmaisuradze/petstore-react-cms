import moment from 'moment';

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const getFormDataValues = (formControls) => {
    const data = {};
    Object.keys(formControls).forEach(key => {
        data[key] = formControls[key].value;
    });
    return data;
};

export const getFormElementsArray = (formControls) => {
    const formElementsArray = [];
    for (let key in formControls) {
        formElementsArray.push({
            key: key,
            config: formControls[key]
        });
    }
    return formElementsArray;
};

export const updateFormOnChange = (stateData, formControls, value, key, type = '') => {
    const validators = formControls[key].validators;
    const equalToValue = validators && validators.equalTo ? stateData[validators.equalTo].value : null;
    const errors = checkFormValidity(value, validators, {equalToValue: equalToValue});

    return updateObject(stateData, {
        [key]: updateObject(stateData[key], {
            value: type === 'date' ? moment(value) : value,
            errors: errors,
            isTouched: true
        })
    });
};

export const checkFormValidity = (value, validators, config = null) => {
    let isValid = true;
    let errors = [];

    if (!validators) {
        return errors;
    }

    if (validators.required) {
        isValid = value.trim() !== '';
        if (!isValid) errors.push('required');
    }

    if (validators.email) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value);
        if (!isValid) errors.push('email');
    }

    if (validators.minLength) {
        isValid = value.length >= validators.minLength;
        if (!isValid) errors.push('minLength');
    }

    if (validators.maxLength) {
        isValid = value.length <= validators.maxLength;
        if (!isValid) errors.push('maxLength');
    }

    if (validators.numeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value);
        if (!isValid) errors.push('numeric');
    }

    if (validators.equalTo) {
        isValid = value === config.equalToValue;
        if (!isValid) errors.push('equalTo');
    }

    return errors;
};
