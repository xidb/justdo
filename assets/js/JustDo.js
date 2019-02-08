import React from 'react';
import {ConnectedRouter} from 'connected-react-router';
import {connect} from 'react-redux';
import routePages from './routes';
import {checkAuth, signOut} from './actions/user';
import '../css/JustDo.scss';
import bg from '../media/bg.png';
import bg2x from '../media/bg@2x.png';
import logo from '../media/logo.svg';

class JustDo extends React.Component {
    componentWillMount() {
        this.props.checkAuth();
    }

    render() {
        const {history, spinner, signedIn} = this.props;
        const containerClass = spinner ? ' jd-container-spinner' : '';
        let signOutButton = '';

        if (signedIn) {
            signOutButton = <button onClick={this.props.signOut} className="jd-page-sign-out">Sign Out</button>;
        }

        return (
            <div className={`jd-container${containerClass}`}>
                <div className="jd-background">
                    <img className="jd-background-logo" src={logo}/>
                    <div className="jd-background-container">
                        <img src={bg} srcSet={`${bg2x} 2x`}/>
                    </div>
                </div>
                <div className="jd-page">
                    {signOutButton}
                    <ConnectedRouter history={history}>
                        {routePages}
                    </ConnectedRouter>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    spinner: state.justDo.spinner,
    signedIn: state.user.signedIn
});

const mapDispatchToProps = dispatch => ({
    checkAuth: () => dispatch(checkAuth(dispatch)),
    signOut: () => dispatch(signOut(dispatch))
});

export default connect(mapStateToProps, mapDispatchToProps)(JustDo);