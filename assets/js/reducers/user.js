import {SIGN_UP_SUCCESS, SIGN_UP_FAIL, SIGN_IN_SUCCESS, SIGN_IN_FAIL} from '../actions/user';

const initialState = {
    error: false,
    message: '',
    redirect: false
};

const userReducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case SIGN_UP_SUCCESS:
            return {...state, error: false, message: action.payload};

        case SIGN_UP_FAIL:
            return {...state, error: true, message: action.payload.message};

        case SIGN_IN_SUCCESS:
            return {...state, error: false, message: action.payload};

        case SIGN_IN_FAIL:
            return {...state, error: true, message: action.payload.message};

        default:
            return state;
    }
};

export default userReducer;