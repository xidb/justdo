import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import Form from './Form';
import makeVisible from '../../media/ic_eye_visible.svg';
import makeInvisible from '../../media/ic_eye_unvisible.svg';

class PasswordResetForm extends Form {
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

        const confirmToggle = this.state.typeConfirm === 'password'
            ? <img src={makeVisible} onClick={this.toggleConfirm} className="jd-form-group-toggle-visible"/>
            : <img src={makeInvisible} onClick={this.toggleConfirm} className="jd-form-group-toggle-invisible"/>;

        return (
            <form onSubmit={this.handleSubmit} className="jd-form jd-sign-form">
                <h2>Reset Password</h2>
                <div className="jd-mb-6">Please create your new password</div>
                <div className="jd-form-group">
                    <Field name="password" component={PasswordResetForm.renderField} type={this.state.typePassword} label="Password"/>
                    {passwordToggle}
                </div>
                <div className="jd-form-group">
                    <Field name="confirm" component={PasswordResetForm.renderField} type={this.state.typeConfirm} label="Confirm Password"/>
                    {confirmToggle}
                </div>
                <div className="jd-form-submit-result">{sumbmitResult}</div>
                <button type="submit">Send</button>
            </form>
        );
    }
}

PasswordResetForm = reduxForm({
    form: 'PasswordReset',
    validate: PasswordResetForm.validate
})(PasswordResetForm);

const mapStateToProps = state => ({
    userForm: state.user.form,
    isError: state.user.error,
    message: state.user.message
});

export default connect(mapStateToProps)(PasswordResetForm);