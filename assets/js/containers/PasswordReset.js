import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import PasswordResetForm from '../components/PasswordResetForm';
import Footer from '../components/Footer';
import {handlePasswordReset} from '../actions/user';

const PasswordReset = props => {
    if (props.userForm === 'signin') {
        return <Redirect to="/sign-in"/>;
    } else {
        return (
            <div className="jd-page-footer">
                <div className="jd-center-container">
                    <PasswordResetForm onSubmit={props.handlePasswordReset}/>
                </div>
                <Footer/>
            </div>
        );
    }
};

const mapStateToProps = state => ({
    userForm: state.user.form
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    handlePasswordReset: values => dispatch(handlePasswordReset(ownProps.match.params['token'], values.password, dispatch))
});

export default connect(mapStateToProps, mapDispatchToProps)(PasswordReset);