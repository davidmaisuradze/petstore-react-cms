import * as actionTypes from '../actionTypes';

const initialState = {
    propertyAttributes: [],
    attributesByPropertyId: [],
    showAttributes: false
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

const setShowAttributes = (state, action) => {
    return {...state, showAttributes: action.show};
};

const getPropertyAttributesByPropertyIdSucceeded = (state, action) => {
    return {...state, attributesByPropertyId: action.payload};
};

const addAttributesByPropertyId = (state, action) => {
    const checkAttributeIndex = state.attributesByPropertyId.findIndex(x => x._id === action.attribute._id);
    if (checkAttributeIndex < 0) {
        return {...state, attributesByPropertyId: [...state.attributesByPropertyId, action.attribute]};
    }
    return state;
};

const removeAttributesByPropertyId = (state, action) => {
    return {...state, attributesByPropertyId: state.attributesByPropertyId.filter(item => item._id !== action.id)};
};

const resetAttributesByPropertyId = (state, action) => {
    return {...state, attributesByPropertyId: []};
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
        case actionTypes.SET_SHOW_ATTRIBUTES:
            return setShowAttributes(state, action);
        case actionTypes.GET_PROPERTY_ATTRIBUTES_BY_PROPERTY_ID_SUCCEEDED:
            return getPropertyAttributesByPropertyIdSucceeded(state, action);
        case actionTypes.ADD_ATTRIBUTES_BY_PROPERTY_ID:
            return addAttributesByPropertyId(state, action);
        case actionTypes.REMOVE_ATTRIBUTES_BY_PROPERTY_ID:
            return removeAttributesByPropertyId(state, action);
        case actionTypes.RESET_ATTRIBUTES_BY_PROPERTY_ID:
            return resetAttributesByPropertyId(state, action);
        default:
            return state;
    }
};