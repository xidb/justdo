import React from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import Footer from './Footer';

const Task = ({signedIn}) => {
    if (signedIn) {
        return (
            <div className="jd-page-footer">
                <div className="jd-center-container">
                    <div>Here you can create tasks and other stuff... not implemented</div>
                </div>
                <Footer/>
            </div>
        );
    } else {
        return <Redirect to="/sign-in"/>;
    }
};

const mapStateToProps = state => ({
    signedIn: state.user.signedIn
});

export default connect(mapStateToProps)(Task);