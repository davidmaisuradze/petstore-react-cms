import * as actionTypes from '../actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
    token: null,
    user: null,
    error: null,
};

const loginStarted = (state, action) => {
    return updateObject(state, {error: null});
};

const loginSucceeded = (state, action) => {
    return updateObject(state, {
        token: action.token,
        user: action.user,
        error: null
    });
};

const loginFailed = (state, action) => {
    return updateObject(state, {error: action.error});
};

const registerStarted = (state, action) => {
    return updateObject(state, {error: null});
};

const registerSucceeded = (state, action) => {
    return updateObject(state, {token: action.token, user: action.user});
};

const registerFailed = (state, action) => {
    return updateObject(state, {error: action.error});
};

const logoutSucceeded = (state, action) => {
    return updateObject(state, {token: null, user: null});
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_STARTED:
            return loginStarted(state, action);
        case actionTypes.LOGIN_SUCCEEDED:
            return loginSucceeded(state, action);
        case actionTypes.LOGIN_FAILED:
            return loginFailed(state, action);
        case actionTypes.REGISTER_STARTED:
            return registerStarted(state, action);
        case actionTypes.REGISTER_SUCCEEDED:
            return registerSucceeded(state, action);
        case actionTypes.REGISTER_FAILED:
            return registerFailed(state, action);
        case actionTypes.LOGOUT_SUCCEEDED:
            return logoutSucceeded(state, action);
        default:
            return state;
    }
};
