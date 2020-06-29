import AllActions from './app/Common/_actions/AllActions';
import AjaxMiddleware from './app/Common/_middlewares/AjaxMiddleware';
import "core-js";
import 'array-flat-polyfill';
import 'fetch-everywhere';
import 'abortcontroller-polyfill'
import * as Immutable from 'immutable';
import * as React from "react";
import { hydrate, render } from 'react-dom';
import { connect, Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { DEV_MODE } from './app/config/config.json';
import Floom from './app/Floom';
import Reducer from './app/_reducers';
import Store from './app/_stores/Store';
import './scss/index.scss';


let reactRoot = document.getElementById('root');
if (reactRoot) {
    // Initialize the store
    // @ts-ignore 
    const composeEnhancers = process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    // @ts-ignore 
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        actionCreators: AllActions
    }) : compose;

    let initialStore = new Store({});
    let store = createStore(Reducer,
        initialStore as any,
        composeEnhancers(applyMiddleware(AjaxMiddleware, thunkMiddleware))
    );

    render(<Provider store={store}>
            <Floom />
        </Provider>, reactRoot);
}

