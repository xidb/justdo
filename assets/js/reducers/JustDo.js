import {SPINNER} from '../actions';

const initialState = {
    spinner: false
};

const justDoReducer = (state = initialState, action) => {
    switch (action.type) {
        case SPINNER:
            return {...state, spinner: !state.spinner };

        default:
            return state;
    }
};

export default justDoReducer;