import * as actionTypes from '../actionTypes';

export const updateLoading = (isActive = true, error = null) => {
    return {
        type: actionTypes.UPDATE_LOADING,
        isActive: isActive,
        error: error
    };
};

export const setFormDefaultValues = payload => {
    return {
        type: actionTypes.SET_FORM_DEFAULT_VALUES,
        payload: payload
    };
};