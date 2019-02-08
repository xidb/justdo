import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import SignInForm from '../components/SignInForm';
import Footer from '../components/Footer';
import {handleSignIn} from '../actions/user';

const SignIn = (props) => {
    if (props.signedIn) {
        return <Redirect to="/task"/>;
    }

    return (
        <div className="jd-page-footer">
            <div className="jd-center-container">
                <SignInForm onSubmit={props.handleSignIn}/>
            </div>
            <Footer/>
        </div>
    )
};

const mapStateToProps = state => ({
    signedIn: state.user.signedIn,
});

const mapDispatchToProps = dispatch => ({
    handleSignIn: values => dispatch(handleSignIn(values, dispatch))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);