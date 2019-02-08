import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import {checkAndActivate} from '../actions/user';

class Activate extends React.Component {
    componentDidMount() {
        this.props.checkAndActivate(this.props.match.params.token);
    }

    render() {
        if (this.props.loaded) {
            if (this.props.isError) {
                return this.props.message;
            } else {
                return <Redirect to={{pathname: '/sign-in'}}/>;
            }
        } else {
            return 'Activating...';
        }
    }
}

const mapStateToProps = store => ({
    isError: store.user.error,
    message: store.user.message,
    loaded: store.user.loaded,
});

const mapDispatchToProps = dispatch => ({
    checkAndActivate: token => dispatch(checkAndActivate(token, dispatch))
});

export default connect(mapStateToProps, mapDispatchToProps)(Activate);