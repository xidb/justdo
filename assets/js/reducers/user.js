import {SIGN_UP_SUCCESS, SIGN_UP_FAIL, SIGN_IN_SUCCESS, SIGN_IN_FAIL, SIGN_OUT, ACTIVATE_SUCCESS, ACTIVATE_FAIL} from '../actions/user';

const initialState = {
    signedIn: false,
    form: '',
    error: false,
    message: '',
    loaded: false
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_UP_SUCCESS:
            return {...state, form: 'signup', error: false, message: action.payload};

        case SIGN_UP_FAIL:
            return {...state, form: 'signup',  error: true, message: action.payload.message};

        case SIGN_IN_SUCCESS:
            return {...state, form: 'signin', error: false, signedIn: true};

        case SIGN_IN_FAIL:
            return {...state, form: 'signin', error: true, message: action.payload.message};

        case SIGN_OUT:
            return {...state, signedIn: false};

        case ACTIVATE_SUCCESS:
            return {...state, form: 'signin', error: false, message: action.payload, loaded: true};

        case ACTIVATE_FAIL:
            return {...state, error: true, message: action.payload.message, loaded: true};

        default:
            return state;
    }
};

export default userReducer;