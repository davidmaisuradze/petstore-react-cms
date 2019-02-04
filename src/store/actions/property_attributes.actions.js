import * as actionTypes from '../actionTypes';

export const getPropertyAttributes = () => {
    return {
        type: actionTypes.GET_PROPERTY_ATTRIBUTES
    };
};

export const getPropertyAttributesSucceeded = payload => {
    return {
        type: actionTypes.GET_PROPERTY_ATTRIBUTES_SUCCEEDED,
        payload: payload
    };
};

export const createPropertyAttribute = payload => {
    return {
        type: actionTypes.CREATE_PROPERTY_ATTRIBUTE,
        payload: payload
    };
};

export const createPropertyAttributeSucceeded = payload => {
    return {
        type: actionTypes.CREATE_PROPERTY_ATTRIBUTE_SUCCEEDED,
        payload: payload
    };
};

export const updatePropertyAttribute = payload => {
    return {
        type: actionTypes.UPDATE_PROPERTY_ATTRIBUTE,
        payload: payload
    };
};

export const updatePropertyAttributeSucceeded = payload => {
    return {
        type: actionTypes.UPDATE_PROPERTY_ATTRIBUTE_SUCCEEDED,
        payload: payload
    };
};

export const deletePropertyAttribute = id => {
    return {
        type: actionTypes.DELETE_PROPERTY_ATTRIBUTE,
        id: id
    };
};

export const deletePropertyAttributeSucceeded = id => {
    return {
        type: actionTypes.DELETE_PROPERTY_ATTRIBUTE_SUCCEEDED,
        id: id
    };
};

export const getPropertyAttributesByPropertyId = propertyId => {
    return {
        type: actionTypes.GET_PROPERTY_ATTRIBUTES_BY_PROPERTY_ID,
        propertyId: propertyId
    };
};

export const getPropertyAttributesByPropertyIdSucceeded = payload => {
    return {
        type: actionTypes.GET_PROPERTY_ATTRIBUTES_BY_PROPERTY_ID_SUCCEEDED,
        payload: payload
    };
};