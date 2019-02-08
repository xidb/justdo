import React from 'react';
import {connect} from 'react-redux';
import SignInForm from '../components/SignInForm';
import Footer from '../components/Footer';
import {handleSignIn} from '../actions/user';

const SignIn = (props) => (
    <div className="jd-page jd-page-footer">
        <div className="jd-center-container">
            <SignInForm onSubmit={props.handleSignIn}/>
        </div>
        <Footer/>
    </div>
);

const mapDispatchToProps = dispatch => ({
    handleSignIn: values => dispatch(handleSignIn(values, dispatch))
});

export default connect(null, mapDispatchToProps)(SignIn);