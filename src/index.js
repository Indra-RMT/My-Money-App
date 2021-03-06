import React from 'react';
import ReactDOM from 'react-dom';
import 'regenerator-runtime';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import './index.css';
import App from './App';
import authReducer from './store/reducers/auth';
import transactionsReducer from './store/reducers/transactions';
import { watchAuth } from './store/sagas/index';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
	auth: authReducer,
	trans: transactionsReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk, sagaMiddleware)
));

sagaMiddleware.run(watchAuth);

const app = (
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>
);

ReactDOM.render(app, document.getElementById('root'));