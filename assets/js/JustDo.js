import React from 'react';
import {ConnectedRouter} from 'connected-react-router';
import routePages from './routes';
import '../css/JustDo.scss';
import bg from '../media/bg.png';
import bg2x from '../media/bg@2x.png';
import logo from '../media/logo.svg';

const JustDo = ({history}) => {
    return (
        <div className="jd-container">
            <div className="jd-background">
                {/*<img className="jd-background-logo" src={logo} />*/}

                <div className="jd-background-container">
                    <img src={bg} srcSet={`${bg2x} 2x`} />
                </div>
            </div>
            <div className="jd-page">
                <ConnectedRouter history={history}>
                    {routePages}
                </ConnectedRouter>
            </div>
        </div>
    );
};

export default JustDo;