import {put} from "redux-saga/effects";
import axios from '../../axios-primary';
import * as actions from '../actions';

export function* getProperties(action) {
    try {
        const response = yield axios.get('/property');
        yield put(actions.getPropertiesSucceeded(response.data));
    } catch (err) {
        console.log(err, 'propertySagaErr');
    }
}

export function* createProperty(action) {
    try {
        const response = yield axios.post('/property', action.payload);
        yield put(actions.createPropertySucceeded(response.data));
    } catch (err) {
        console.log(err, 'propertySagaErr');
    }
}

export function* updateProperty(action) {
    try {
        const response = yield axios.put('/property', action.payload);
        yield put(actions.updatePropertySucceeded(response.data));
    } catch (err) {
        console.log(err, 'propertySagaErr');
    }
}

export function* deleteProperty(action) {
    try {
        yield axios.delete('/property/' + action.id);
        yield put(actions.deletePropertySucceeded(action.id));
    } catch (err) {
        console.log(err, 'propertySagaErr');
    }
}