import * as actionTypes from '../actionTypes';

export const updateLoading = (isActive = true, error = null) => {
    return {
        type: actionTypes.UPDATE_LOADING,
        isActive: isActive,
        error: error
    };
};
