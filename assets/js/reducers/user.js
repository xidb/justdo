import {SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNIN_FAIL} from '../actions/user';

const initialState = {
    name: '',
    error: false,
    isFetching: false
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGNIN_REQUEST:
            return {...state, isFetching: true, error: false};

        case SIGNIN_SUCCESS:
            return {...state, isFetching: false, name: action.payload};

        case SIGNIN_FAIL:
            return {...state, isFetching: false, error: action.payload.message};

        default:
            return state;
    }
};

export default userReducer;