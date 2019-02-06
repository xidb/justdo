export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

const handleLogin = (callback) => {
    return (dispatch) => {
        dispatch({
            type: LOGIN_REQUEST
        });

        //await fetch
        if (1) {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: 'username'
            });

            if (typeof callback === 'function') {
                callback();
            }
        } else {
            dispatch({
                type: LOGIN_FAIL,
                error: true,
                payload: new Error('Error')
            });
        }
    };
};

export default handleLogin;