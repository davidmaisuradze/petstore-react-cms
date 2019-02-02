import {updateObject} from "../../shared/utility";
import * as actionTypes from '../actionTypes';

const initialState = {
    loading: false,
    error: null
};

const updateLoading = (state, action) => {
    return updateObject(state, {loading: action.isActive, error: action.error});
};

export const globalReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_LOADING:
            return updateLoading(state, action);
        default:
            return state;
    }
};
