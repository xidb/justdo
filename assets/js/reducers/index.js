import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import userReducer from './user';

const rootReducer = (history) => combineReducers({
    user: userReducer,
    router: connectRouter(history)
});

export default rootReducer;