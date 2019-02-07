import React from 'react';
import {Field, reduxForm} from 'redux-form';

let SignInForm = props => {
    const {handleSubmit} = props;

    return (
        <form onSubmit={handleSubmit} className="jd-form jd-sign-form">
            <h2>Sign In</h2>
            <div className="jd-form-group">
                <Field name="email" component="input" type="text" placeholder="E-mail"/>
            </div>
            <div className="jd-form-group">
                <Field name="password" component="input" type="password" placeholder="Password"/>
            </div>
            <div className="jd-form-group">
                <Field name="confirmPassword" component="input" type="password" placeholder="Confirm Password"/>
            </div>
            <button type="submit">Sign In</button>
        </form>
    );
};

SignInForm = reduxForm({
    form: 'signin'
})(SignInForm);

export default SignInForm;