import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import SignUpForm from '../components/SignUpForm';
import Footer from '../components/Footer';
import {handleSignUp} from '../actions/user';

const SignUp = props => {
    if (props.signedIn) {
        return <Redirect to="/task"/>;
    }

    return (
        <div className="jd-page-footer">
            <div className="jd-center-container">
                <SignUpForm onSubmit={props.handleSignUp}/>
            </div>
            <Footer/>
        </div>
    );
};

const mapStateToProps = state => ({
    signedIn: state.user.signedIn,
});

const mapDispatchToProps = dispatch => ({
    handleSignUp: values => dispatch(handleSignUp(values, dispatch))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);