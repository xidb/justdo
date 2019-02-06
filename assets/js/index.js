import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import configureStore, { history } from './configureStore';
import JustDo from './JustDo';

const store = configureStore();

const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <JustDo history={history}/>
        </Provider>,
        document.getElementById('root')
    )
};

render();