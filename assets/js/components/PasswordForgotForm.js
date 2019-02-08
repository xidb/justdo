import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import Form from './Form';

class PasswordForgotForm extends Form {
    render() {
        const {form, userForm, isError, message} = this.props;
        let sumbmitResult = '';
        if (form.toLowerCase() === userForm) {
            sumbmitResult =
                <div className="jd-form-submit-result">
                    <div className={`jd-form-submit-result-${isError ? 'error' : 'success'}`}>{message}</div>
                </div>
        }

        return (
            <form onSubmit={this.handleSubmit} className="jd-form jd-sign-form">
                <h2>Forgot Password</h2>
                <div className="jd-mb-6">Please enter your email below to receive your password reset instruction</div>
                <div className="jd-form-group">
                    <Field name="email" component={PasswordForgotForm.renderField} type="text" label="E-mail"/>
                </div>
                <div className="jd-form-submit-result">{sumbmitResult}</div>
                <button type="submit">Send</button>
            </form>
        );
    }
}

PasswordForgotForm = reduxForm({
    form: 'PasswordForgot',
    validate: PasswordForgotForm.validate
})(PasswordForgotForm);

const mapStateToProps = state => ({
    userForm: state.user.form,
    isError: state.user.error,
    message: state.user.message
});

export default connect(mapStateToProps)(PasswordForgotForm);