import {SIGN_UP_SUCCESS, SIGN_UP_FAIL, SIGN_IN_SUCCESS, SIGN_IN_FAIL, TOKEN_SUCCESS, TOKEN_FAIL} from '../actions/user';

const initialState = {
    error: false,
    message: '',
    loaded: false
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_UP_SUCCESS:
            return {...state, error: false, message: action.payload};

        case SIGN_UP_FAIL:
            return {...state, error: true, message: action.payload.message};

        case SIGN_IN_SUCCESS:
            return {...state, error: false, message: action.payload};

        case SIGN_IN_FAIL:
            return {...state, error: true, message: action.payload.message};

        case TOKEN_SUCCESS:
            return {...state, error: false, message: action.payload, loaded: true};

        case TOKEN_FAIL:
            return {...state, error: true, message: action.payload.message, loaded: true};

        default:
            return state;
    }
};

export default userReducer;