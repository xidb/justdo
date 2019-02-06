import React from 'react';
import {connect} from 'react-redux';
import handleLogin from '../actions/user';
import Footer from './Footer';

class SignIn extends React.Component {
    render() {
        console.log(this.props.user);
        const {name, error, isFetching} = this.props.user;

        if (isFetching) {
            return (
                <div className='jd-page jd-page-footer'>
                    Loading...
                    <Footer/>
                </div>
            );
        } else if (name.length) {
            return (
                <div className='jd-page jd-page-footer'>
                    Howdy, {name}!
                    <Footer/>
                </div>
            );
        } else if (error) {
            return (
                <div className='jd-page jd-page-footer'>
                    {error}
                    <Footer/>
                </div>
            );
        } else {
            return (
                <div className='jd-page jd-page-footer'>
                    <form className='jd-signin-form'>
                        <h1 onClick={this.props.handleLogin}>Sign In</h1>
                        Form
                    </form>
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