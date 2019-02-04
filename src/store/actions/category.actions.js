import * as actionTypes from '../actionTypes';

export const getCategories = () => {
    return {
        type: actionTypes.GET_CATEGORIES
    };
};

export const getCategoriesSucceeded = payload => {
    return {
        type: actionTypes.GET_CATEGORIES_SUCCEEDED,
        payload: payload
    }
};
