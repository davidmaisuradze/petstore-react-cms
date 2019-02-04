import * as actionTypes from '../actionTypes';

const initialState = {
    propertyAttributes: [],
    attributesByPropertyId: []
};

const getPropertyAttributesSucceeded = (state, action) => {
    return {...state, propertyAttributes: action.payload};
};

const createPropertyAttributesSucceeded = (state, action) => {
    return {...state, propertyAttributes: [action.payload, ...state.propertyAttributes]};
};

const updatePropertyAttributesSucceeded = (state, action) => {
    const newState = state.propertyAttributes.map(item => {
        if (item._id === action.payload._id) {
            return {...item, _id: action.payload._id, value: action.payload.value, type: action.payload.type};
        }
        return item;
    });
    return {propertyAttributes: newState};
};

const deletePropertyAttributesSucceeded = (state, action) => {
    return {...state, propertyAttributes: state.propertyAttributes.filter(item => item._id !== action.id)};
};

const getPropertyAttributesByPropertyIdSucceeded = (state, action) => {
    return {...state, attributesByPropertyId: action.payload};
};

export const propertyAttributesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_PROPERTY_ATTRIBUTES_SUCCEEDED:
            return getPropertyAttributesSucceeded(state, action);
        case actionTypes.CREATE_PROPERTY_ATTRIBUTE_SUCCEEDED:
            return createPropertyAttributesSucceeded(state, action);
        case actionTypes.UPDATE_PROPERTY_ATTRIBUTE_SUCCEEDED:
            return updatePropertyAttributesSucceeded(state, action);
        case actionTypes.DELETE_PROPERTY_ATTRIBUTE_SUCCEEDED:
            return deletePropertyAttributesSucceeded(state, action);
        default:
            return state;
    }
};