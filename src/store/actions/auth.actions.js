import * as actionTypes from '../actionTypes';

export const loginUser = (email, password) => {
    return {
        type: actionTypes.LOGIN_USER,
        email: email,
        password: password
    };
};

export const loginStarted = () => {
    return {
        type: actionTypes.LOGIN_STARTED
    };
};

export const loginSucceeded = (token, user) => {
    return {
        type: actionTypes.LOGIN_SUCCEEDED,
        token: token,
        user: user
    };
};

export const loginFailed = error => {
    return {
        type: actionTypes.LOGIN_FAILED,
        error: error
    };
};

export const registerUser = (payload) => {
    return {
        type: actionTypes.REGISTER_USER,
        payload: payload
    };
};

export const registerStarted = () => {
    return {
        type: actionTypes.REGISTER_STARTED
    };
};

export const registerSucceeded = (token, user) => {
    return {
        type: actionTypes.REGISTER_SUCCEEDED,
        token: token,
        user: user
    };
};

export const registerFailed = error => {
    return {
        type: actionTypes.REGISTER_FAILED,
        error: error
    };
};

export const logoutUser = () => {
    return {
        type: actionTypes.LOGOUT_USER
    };
};

export const logoutSucceeded = () => {
    return {
        type: actionTypes.LOGOUT_SUCCEEDED
    };
};
