import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import {reducer as formReducer} from 'redux-form';
import userReducer from './user';

const rootReducer = (history) => combineReducers({
    user: userReducer,
    form: formReducer,
    router: connectRouter(history)
});

export default rootReducer;