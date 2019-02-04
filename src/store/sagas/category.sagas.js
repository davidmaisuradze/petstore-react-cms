import {put} from 'redux-saga/effects';
import axios from '../../axios-primary';
import * as actions from '../actions';

export function* getCategories(action) {
    try {
        const response = yield axios.get('/category');

        yield put(actions.getCategoriesSucceeded(response.data));
    } catch (err) {
        console.log(err, 'sagaErr');
    }
}
