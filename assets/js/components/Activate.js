import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import {checkAndActivate} from '../actions/user';

class Activate extends React.Component {
    componentDidMount() {
        this.props.checkAndActivate(this.props.match.params['token']);
    }

    render() {
        if (this.props.loaded) {
            if (this.props.isError) {
                return this.props.message;
            } else {
                return <Redirect to="/sign-in"/>;
            }
        } else {
            return 'Activating...';
        }
    }
}

const mapStateToProps = state => ({
    isError: state.user.error,
    message: state.user.message,
    loaded: state.user.loaded,
});

const mapDispatchToProps = dispatch => ({
    checkAndActivate: token => dispatch(checkAndActivate(token, dispatch))
});

export default connect(mapStateToProps, mapDispatchToProps)(Activate);