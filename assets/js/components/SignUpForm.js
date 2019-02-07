import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';

let SignUpForm = props => {
    const {handleSubmit} = props;

    return (
        <form onSubmit={handleSubmit} className="jd-form jd-sign-form">
            <h2>Sign Up</h2>
            <div className="jd-form-group">
                <Field name="email" component="input" type="text" placeholder="E-mail"/>
            </div>
            <div className="jd-form-group">
                <Field name="password" component="input" type="password" placeholder="Password"/>
            </div>
            <div className="jd-form-group">
                <Field name="confirmPassword" component="input" type="password" placeholder="Confirm Password"/>
            </div>
            <button type="submit">Sign Up</button>
            <div>I already have an account.&nbsp;<Link to="/sign-in">Sign In</Link></div>
        </form>
    );
};

SignUpForm = reduxForm({
    form: 'signup'
})(SignUpForm);

export default SignUpForm;