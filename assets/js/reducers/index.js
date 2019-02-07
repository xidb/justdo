import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import {reducer as formReducer} from 'redux-form';
import justDoReducer from './JustDo';
import userReducer from './user';

const rootReducer = (history) => combineReducers({
    justDo: justDoReducer,
    user: userReducer,
    form: formReducer,
    router: connectRouter(history)
});

export default rootReducer;