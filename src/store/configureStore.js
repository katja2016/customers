import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import customersReducer from '../reducers/customers';
import filtersReducer from '../reducers/filters';
import authReducer from '../reducers/auth';

// for redux dev tool
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE__ || compose;

// Store creation
export default () => {
    const store = createStore(
        combineReducers({
            customers: customersReducer,
            filters: filtersReducer,
            auth: authReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );
    return store;
};

