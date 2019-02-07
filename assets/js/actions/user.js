export const SIGNIN_REQUEST = 'SIGNIN_REQUEST';
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
export const SIGNIN_FAIL = 'SIGNIN_FAIL';

const handleSIGNIN = dispatch => {
    const request = new Request(`http://justdo.loc/api/auth`, {
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({
            email: 'boytsov.dm@gmail.com',
            password: '12345'
        })
    });

    fetch(request)
        .then(response => {
            return response.json();
        })
        .then(response => {
            console.log(response);
            // if (response === 1) {
            //     dispatch({
            //         type: SIGNIN_SUCCESS,
            //         payload: 'user'
            //     });
            // } else {
            //     dispatch({
            //         type: SIGNIN_FAIL,
            //         error: true,
            //         payload: new Error('Auth error')
            //     });
            // }
        });

    return {
        type: SIGNIN_REQUEST
    };
};

export default handleSIGNIN;