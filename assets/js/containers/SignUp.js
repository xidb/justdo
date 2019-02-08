import React from 'react';
import {connect} from 'react-redux';
import SignUpForm from '../components/SignUpForm';
import Footer from '../components/Footer';
import {handleSignUp} from '../actions/user';

const SignUp = (props) => (
    <div className="jd-page jd-page-footer">
        <div className="jd-center-container">
            <SignUpForm onSubmit={props.handleSignUp}/>
        </div>
        <Footer/>
    </div>
);

const mapDispatchToProps = dispatch => ({
    handleSignUp: values => dispatch(handleSignUp(values, dispatch))
});

export default connect(null, mapDispatchToProps)(SignUp);