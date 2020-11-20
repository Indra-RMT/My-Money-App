import React, { Suspense, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Route,
  Switch,
	withRouter,
	Redirect
} from 'react-router-dom';
import * as actions from './store/actions/index';

import Auth from './containers/Auth';
import HomePage from './containers/HomePage';
import Transaction from './containers/Transaction';

const App = (props) => {
	const { onTryAutoSignup } = props;

  useEffect(() => {
    onTryAutoSignup();
	}, []);
	
	const Page404 = ({ location }) => (
		<div>
			 <h2>No match found for <code>{location.pathname}</code></h2>
		</div>
 );

	let routes = '';
	if (props.isAuthenticated) {
		routes = (
			<Switch>
				<Route path="/Auth" render={(props) => <Auth {...props} />} />
				<Route path="/Transaction" render={(props) => <Transaction {...props}/>} />
				<Route path="/" exact render={(props) => <HomePage {...props} />} />
				<Route component={Page404} />
			</Switch>
		)
	} else {
		routes = (
			<Switch>
				<Route path="/Auth" render={(props) => <Auth {...props} />} />
				<Route path="/" exact render={(props) => <HomePage {...props} />} />
				<Route component={Page404} />
			</Switch>
		)
	}

	return (
		<Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
	);
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));