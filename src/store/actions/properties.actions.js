import * as actionTypes from '../actionTypes';

export const getProperties = () => {
    return {
        type: actionTypes.GET_PROPERTIES
    };
};

export const getPropertiesSucceeded = payload => {
    return {
        type: actionTypes.GET_PROPERTIES_SUCCEEDED,
        payload: payload
    };
};

export const createProperty = payload => {
    return {
        type: actionTypes.CREATE_PROPERTY,
        payload: payload
    };
};

export const createPropertySucceeded = payload => {
    return {
        type: actionTypes.CREATE_PROPERTY_SUCCEEDED,
        payload: payload
    };
};

export const updateProperty = payload => {
    return {
        type: actionTypes.UPDATE_PROPERTY,
        payload: payload
    };
};

export const updatePropertySucceeded = payload => {
    return {
        type: actionTypes.UPDATE_PROPERTY_SUCCEEDED,
        payload: payload
    };
};

export const deleteProperty = id => {
    return {
        type: actionTypes.DELETE_PROPERTY,
        id: id
    };
};

export const deletePropertySucceeded = id => {
    return {
        type: actionTypes.DELETE_PROPERTY_SUCCEEDED,
        id: id
    };
};