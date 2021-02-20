import {combineReducers} from 'redux';
import storeReducer from '../actions/store';
import orderReducer from './order'

export default rootReducer = combineReducers({
    store: storeReducer,
    order: orderReducer
});