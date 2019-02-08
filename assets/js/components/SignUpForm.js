import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import Form from './Form';
import makeVisible from '../../media/ic_eye_visible.svg';
import makeInvisible from '../../media/ic_eye_unvisible.svg';

class SignUpForm extends Form {
    render() {
        const passwordToggle = this.state.typePassword === 'password'
            ? <img src={makeVisible} onClick={this.togglePassword} className="jd-form-group-toggle-visible"/>
            : <img src={makeInvisible} onClick={this.togglePassword} className="jd-form-group-toggle-invisible"/>;

        const confirmToggle = this.state.typeConfirm === 'password'
            ? <img src={makeVisible} onClick={this.toggleConfirm} className="jd-form-group-toggle-visible"/>
            : <img src={makeInvisible} onClick={this.toggleConfirm} className="jd-form-group-toggle-invisible"/>;

        return (
            <form onSubmit={this.handleSubmit} className="jd-form jd-sign-form">
                <h2>Sign Up</h2>
                <div className="jd-form-group">
                    <Field name="email" component={SignUpForm.renderField} type="text" label="E-mail"/>
                </div>
                <div className="jd-form-group">
                    <Field name="password" component={SignUpForm.renderField} type={this.state.typePassword} label="Password"/>
                    {passwordToggle}
                </div>
                <div className="jd-form-group">
                    <Field name="confirm" component={SignUpForm.renderField} type={this.state.typeConfirm} label="Confirm Password"/>
                    {confirmToggle}
                </div>
                <div className="jd-form-submit-result">
                    <div className={`jd-form-submit-result-${this.props.isError ? 'error' : 'success'}`}>{this.props.message}</div>
                </div>
                <button type="submit">Sign Up</button>
                <div>I already have an account.&nbsp;<Link to="/sign-in">Sign In</Link></div>
            </form>
        );
    }
}

SignUpForm = reduxForm({
    form: 'signup',
    validate: SignUpForm.validate
})(SignUpForm);

const mapStateToProps = state => ({
    isError: state.user.error,
    message: state.user.message
});

export default connect(mapStateToProps)(SignUpForm);