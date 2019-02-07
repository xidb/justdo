import React from 'react';
import {connect} from 'react-redux';
import handleLogin from '../actions/user';
import SignInForm from '../components/SignInForm';
import Footer from '../components/Footer';

class SignIn extends React.Component {
    render() {
        const {name, error} = this.props.user;

        if (false) {
            return (
                <div className="jd-page jd-page-footer">
                    Loading...
                    <Footer/>
                </div>
            );
        } else if (name.length) {
            return (
                <div className="jd-page jd-page-footer">
                    Howdy, {name}!
                    <Footer/>
                </div>
            );
        } else if (error) {
            return (
                <div className="jd-page jd-page-footer">
                    {error}
                    <Footer/>
                </div>
            );
        } else {
            return (
                <div className="jd-page jd-page-footer">
                    <div className="jd-center-container">
                        <SignInForm/>
                    </div>
                    <Footer/>
                </div>
            );
        }
    }
}

const mapStateToProps = store => ({
    user: store.user
});

const mapDispatchToProps = dispatch => ({
    handleLogin: () => dispatch(handleLogin(dispatch))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);