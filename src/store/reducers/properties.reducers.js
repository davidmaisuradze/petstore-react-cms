import * as actionTypes from '../actionTypes';

const initialState = {
    properties: []
};

const getPropertiesSucceeded = (state, action) => {
    return {...state, properties: action.payload};
};

const createPropertySucceeded = (state, action) => {
    return {...state, properties: [action.payload, ...state.properties]};
};

const updatePropertySucceeded = (state, action) => {
    const newState = state.properties.map(item => {
        if (item._id === action.payload._id) {
            return {...item, _id: action.payload._id, title: action.payload.title, type: action.payload.type};
        }
        return item;
    });
    return {properties: newState};
};

const deletePropertySucceeded = (state, action) => {
    return {...state, properties: state.properties.filter(item => item._id !== action.id)};
};

export const propertiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_PROPERTIES_SUCCEEDED:
            return getPropertiesSucceeded(state, action);
        case actionTypes.CREATE_PROPERTY_SUCCEEDED:
            return createPropertySucceeded(state, action);
        case actionTypes.UPDATE_PROPERTY_SUCCEEDED:
            return updatePropertySucceeded(state, action);
        case actionTypes.DELETE_PROPERTY_SUCCEEDED:
            return deletePropertySucceeded(state, action);
        default:
            return state;
    }
};