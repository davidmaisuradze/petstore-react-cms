import {updateObject} from "../../shared/utility";
import * as actionTypes from '../actionTypes';

const initialState = {
    loading: false,
    error: null,
    formDefaultValues: null
};

const updateLoading = (state, action) => {
    return updateObject(state, {loading: action.isActive, error: action.error});
};

const setFormDefaultValues = (state, action) => {
    return {...state, formDefaultValues: action.payload};
};

export const globalReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_LOADING:
            return updateLoading(state, action);
        case actionTypes.SET_FORM_DEFAULT_VALUES:
            return setFormDefaultValues(state, action);
        default:
            return state;
    }
};
