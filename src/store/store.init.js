import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import * as reducers from "./reducers";
import createSagaMiddleware from "redux-saga";
import {watchAuth, watchCategory, watchProperty, watchPropertyAttribute} from "./sagas";

const composeEnhancers =
    process.env.NODE_ENV === "development"
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : null || compose;

const rootReducer = combineReducers({
    global: reducers.globalReducer,
    auth: reducers.authReducer,
    category: reducers.categoryReducer,
    properties:reducers.propertiesReducer,
    propertyAttribute: reducers.propertyAttributesReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchCategory);
sagaMiddleware.run(watchProperty);
sagaMiddleware.run(watchPropertyAttribute);

export default store;