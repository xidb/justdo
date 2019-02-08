import React from 'react';
import {connect} from 'react-redux';
import PasswordForgotForm from '../components/PasswordForgotForm';
import Footer from '../components/Footer';
import {handlePasswordForgot} from '../actions/user';

const PasswordForgot = (props) => (
    <div className="jd-page-footer">
        <div className="jd-center-container">
            <PasswordForgotForm onSubmit={props.handlePasswordForgot}/>
        </div>
        <Footer/>
    </div>
);

const mapDispatchToProps = dispatch => ({
    handlePasswordForgot: values => dispatch(handlePasswordForgot(values.email, dispatch))
});

export default connect(null, mapDispatchToProps)(PasswordForgot);