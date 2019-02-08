import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import Form from './Form';
import makeVisible from '../../media/ic_eye_visible.svg';
import makeInvisible from '../../media/ic_eye_unvisible.svg';

class SignInForm extends Form {
    render() {
        const {form, userForm, isError, message} = this.props;
        let sumbmitResult = '';
        if (form.toLowerCase() === userForm) {
            sumbmitResult =
                <div className="jd-form-submit-result">
                    <div className={`jd-form-submit-result-${isError ? 'error' : 'success'}`}>{message}</div>
                </div>
        }

        const passwordToggle = this.state.typePassword === 'password'
            ? <img src={makeVisible} onClick={this.togglePassword} className="jd-form-group-toggle-visible"/>
            : <img src={makeInvisible} onClick={this.togglePassword} className="jd-form-group-toggle-invisible"/>;

        return (
            <form onSubmit={this.handleSubmit} className="jd-form jd-sign-form">
                <h2>Sign In</h2>
                <div className="jd-form-group">
                    <Field name="email" component={SignInForm.renderField} type="text" label="E-mail"/>
                </div>
                <div className="jd-form-group">
                    <Field name="password" component={SignInForm.renderField} type={this.state.typePassword} label="Password"/>
                    {passwordToggle}
                </div>
                <div className="jd-form-submit-result">{sumbmitResult}</div>
                <div className="jd-mb-4"><Link to={{pathname: '/forgot-password', state: {clear: true}}}>Forgot Password</Link></div>
                <button type="submit">Sign In</button>
                <Link to="/sign-up">Sign Up</Link>
            </form>
        );
    }
}

SignInForm = reduxForm({
    form: 'SignIn',
    validate: SignInForm.validate
})(SignInForm);

const mapStateToProps = state => ({
    userForm: state.user.form,
    isError: state.user.error,
    message: state.user.message
});

export default connect(mapStateToProps)(SignInForm);