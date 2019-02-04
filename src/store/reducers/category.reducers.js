import * as actionTypes from '../actionTypes';

const initialState = {
    categories: [],
    error: null
};

const getCategoriesSucceeded = (state, action) => {
    return {...state, categories: action.payload};
};

export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_CATEGORIES_SUCCEEDED:
            return getCategoriesSucceeded(state, action);
        default:
            return state;
    }
};
