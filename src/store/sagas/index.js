import {takeEvery, all} from 'redux-saga/effects';

import * as actionTypes from '../actionTypes';
import {loginUserSaga, logoutUserSaga, registerUserSaga,} from './auth.sagas';
import {getCategories} from './category.sagas';
import {
    createPropertyAttribute,
    deletePropertyAttribute,
    getPropertyAttributes,
    updatePropertyAttribute,
    getPropertyAttributesByPropertyId
} from "./property-attributes.sagas";
import {createProperty, deleteProperty, getProperties, updateProperty} from "./properties.sagas";

// auth
export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.LOGIN_USER, loginUserSaga),
        takeEvery(actionTypes.REGISTER_USER, registerUserSaga),
        takeEvery(actionTypes.LOGOUT_USER, logoutUserSaga)
    ]);
}

// category
export function* watchCategory() {
    yield all([
        takeEvery(actionTypes.GET_CATEGORIES, getCategories)
    ]);
}

// property
export function* watchProperty() {
    yield all([
        takeEvery(actionTypes.GET_PROPERTIES, getProperties),
        takeEvery(actionTypes.CREATE_PROPERTY, createProperty),
        takeEvery(actionTypes.UPDATE_PROPERTY, updateProperty),
        takeEvery(actionTypes.DELETE_PROPERTY, deleteProperty)
    ]);
}

// property attributes
export function* watchPropertyAttribute() {
    yield all([
        takeEvery(actionTypes.GET_PROPERTY_ATTRIBUTES, getPropertyAttributes),
        takeEvery(actionTypes.CREATE_PROPERTY_ATTRIBUTE, createPropertyAttribute),
        takeEvery(actionTypes.UPDATE_PROPERTY_ATTRIBUTE, updatePropertyAttribute),
        takeEvery(actionTypes.DELETE_PROPERTY_ATTRIBUTE, deletePropertyAttribute),
        takeEvery(actionTypes.GET_PROPERTY_ATTRIBUTES_BY_PROPERTY_ID, getPropertyAttributesByPropertyId)
    ]);
}