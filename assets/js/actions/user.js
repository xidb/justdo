import {APP_URL, API_URL} from '../constants';
import {SPINNER} from './index';

export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAIL = 'SIGN_UP_FAIL';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAIL = 'SIGN_IN_FAIL';

const handleSignUp = (values, dispatch) => {
    dispatch({
        type: SPINNER
    });

    const request = new Request(`${API_URL}user`, {
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({
            email: values.email,
            password: values.password,
            appURL: APP_URL
        })
    });

    let responseOk = true;

    fetch(request)
        .then(response => {
            responseOk = response.ok;
            return response.json();
        })
        .then(data => {
            if (responseOk) {
                dispatch({
                    type: SIGN_UP_SUCCESS,
                    payload: 'Please check your e-mail to confirm sign up'
                });
            } else {
                let payload = data.message;
                if (typeof data.errors !== 'undefined') {
                    if (Array.isArray(data.errors.email) || Array.isArray(data.errors.password)) {
                        payload = '';
                    }
                    if (Array.isArray(data.errors.email)) {
                        payload += data.errors.email.join('\n');
                    }
                    if (Array.isArray(data.errors.password)) {
                        payload += data.errors.password.join('\n');
                    }
                }

                dispatch({
                    type: SIGN_UP_FAIL,
                    payload: new Error(payload)
                });
            }
        })
        .then(() => {
            dispatch({
                type: SPINNER
            });
        });

    return {
        type: ''
    };
};

export default handleSignUp;