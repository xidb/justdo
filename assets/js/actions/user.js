import {API_URL, APP_URL} from '../constants';
import {SPINNER} from './index';

export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAIL = 'SIGN_UP_FAIL';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAIL = 'SIGN_IN_FAIL';
export const SIGN_OUT = 'SIGN_OUT';
export const TOKEN_SUCCESS = 'TOKEN_SUCCESS';
export const TOKEN_FAIL = 'TOKEN_FAIL';

export const handleSignUp = (values, dispatch) => {
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
                    payload: 'Please check your e-mail to confirm sign up.'
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

export const handleSignIn = (values, dispatch) => {
    dispatch({
        type: SPINNER
    });

    const request = new Request(`${API_URL}auth`, {
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({
            email: values.email,
            password: values.password
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
                if (typeof data.attributes !== 'undefined' && data.attributes['accessToken']) {
                    localStorage.setItem('accessToken', data.attributes['accessToken']);
                    dispatch({
                        type: SIGN_IN_SUCCESS
                    });
                } else {
                    dispatch({
                        type: SIGN_IN_FAIL,
                        payload: new Error('Sing-In failed.')
                    });
                }

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
                    type: SIGN_IN_FAIL,
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

export const checkAuth = dispatch => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken && accessToken.length) {
        return dispatch({
            type: SIGN_IN_SUCCESS
        });
    }
    return dispatch({
        type: ''
    });
};

export const signOut = dispatch => {
    localStorage.removeItem('accessToken');
    return dispatch({
        type: SIGN_OUT
    });
};

export const checkAndActivate = (token, dispatch) => {
    dispatch({
        type: SPINNER
    });

    (function check() {
        const request = new Request(`${API_URL}user-token/${token}`);

        let responseOk = true;

        fetch(request)
            .then(response => {
                responseOk = response.ok;
                return response.json();
            })
            .then(data => {
                if (responseOk) {
                    activate();
                } else {
                    dispatch({
                        type: TOKEN_FAIL,
                        payload: new Error(data.message)
                    });
                    dispatch({
                        type: SPINNER
                    });
                }
            })
    })();

    function activate() {
        const request = new Request(`${API_URL}user-token/${token}/activate`);

        let responseOk = true;

        fetch(request)
            .then(response => {
                responseOk = response.ok;
                return response.json();
            })
            .then(data => {
                if (responseOk) {
                    dispatch({
                        type: TOKEN_SUCCESS,
                        payload: 'Your e-mail has been confirmed.'
                    });
                } else {
                    dispatch({
                        type: TOKEN_FAIL,
                        payload: new Error(data.message)
                    });
                }
            })
            .then(() => {
                dispatch({
                    type: SPINNER
                });
            });
    }

    return {
        type: ''
    };
};