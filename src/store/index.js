import reducers from '../reducers';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

const applyStoreMiddleware = applyMiddleware(thunk)(createStore);
export const store = applyStoreMiddleware(reducers);
