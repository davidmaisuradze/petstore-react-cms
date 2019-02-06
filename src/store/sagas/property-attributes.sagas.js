import {put} from "redux-saga/effects";
import axios from '../../axios-primary';
import * as actions from '../actions';

export function* getPropertyAttributes(action) {
    try {
        const response = yield axios.get('/propertyAttribute');
        yield put(actions.getPropertyAttributesSucceeded(response.data));
    } catch (err) {
        console.log(err, 'propertyAttributeSagaErr');
    }
}

export function* createPropertyAttribute(action) {
    try {
        const response = yield axios.post('/propertyAttribute', action.payload);
        yield put(actions.createPropertyAttributeSucceeded(response.data));
    } catch (err) {
        console.log(err, 'propertyAttributeSagaErr');
    }
}

export function* updatePropertyAttribute(action) {
    try {
        const response = yield axios.put('/propertyAttribute', action.payload);
        yield put(actions.updatePropertyAttributeSucceeded(response.data));
    } catch (err) {
        console.log(err, 'propertyAttributeSagaErr');
    }
}

export function* deletePropertyAttribute(action) {
    try {
        yield axios.delete('/propertyAttribute/' + action.id);
        yield put(actions.deletePropertyAttributeSucceeded(action.id));
    } catch (err) {
        console.log(err, 'propertyAttributeSagaErr');
    }
}

export function* getPropertyAttributesByPropertyId(action) {
    try {
        const response = yield axios.get('/propertyAttribute/getPropertyAttributesByPropertyId/' + action.id);
        yield put(actions.getPropertyAttributesByPropertyIdSucceeded(response.data));
    } catch (err) {
        console.log(err, 'propertyAttributeSagaErr');
    }
}