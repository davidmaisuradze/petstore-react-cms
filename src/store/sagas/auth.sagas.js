import {put} from 'redux-saga/effects';
import axios from '../../axios-primary';
import * as actions from '../actions';
import {LOCALSTORAGE_TOKEN} from "../../constants/global.constants";

export function* loginUserSaga(action) {
    try {
        yield put(actions.loginStarted());

        const loginData = {
            email: action.email,
            password: action.password
        };

        const response = yield axios.post('/auth/login', loginData);
        const {token, user} = response.data;

        // set localStorage data
        localStorage.setItem(LOCALSTORAGE_TOKEN, token);

        // set store data
        yield put(actions.loginSucceeded(token, user));
    } catch (err) {
        console.log(err, 'sagaErr');
    }
}

export function* registerUserSaga(action) {
    try {
        yield put(actions.registerStarted());

        const registerData = {
            email: action.payload.email,
            password: action.payload.password,
            mobilePhone: action.payload.mobilePhone,
            firstName: action.payload.firstName,
            lastName: action.payload.lastName,
            birthDate: action.payload.birthDate._d,
            genderId: action.payload.genderId,
            role: 'admin'
        };

        const response = yield axios.post('/auth/register', registerData);
        const {token, user} = response.data;

        // set localStorage data
        localStorage.setItem(LOCALSTORAGE_TOKEN, token);

        // set store data
        yield put(actions.registerSucceeded(token, user));
    } catch (err) {
        yield put(actions.registerFailed(err));
    }
}

export function* logoutUserSaga(action) {
    // clear user data from localStorage
    yield localStorage.removeItem(LOCALSTORAGE_TOKEN);

    yield put(actions.logoutSucceeded());
}
