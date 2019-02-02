import {takeEvery, all} from 'redux-saga/effects';

import * as actionTypes from '../actionTypes';
import {loginUserSaga, logoutUserSaga, registerUserSaga,} from './auth';
import {getCategories} from './category';

export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.LOGIN_USER, loginUserSaga),
        takeEvery(actionTypes.REGISTER_USER, registerUserSaga),
        takeEvery(actionTypes.LOGOUT_USER, logoutUserSaga)
    ]);
}

export function* watchCategory() {
    yield all([
        takeEvery(actionTypes.GET_CATEGORIES, getCategories)
    ]);
}
