import React, { Suspense, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Route,
  Switch,
	withRouter
} from 'react-router-dom';
import * as actions from './store/actions/index';

import Auth from './containers/Auth';
import HomePage from './containers/HomePage';

const App = (props) => {
	const { onTryAutoSignup } = props;

  useEffect(() => {
    onTryAutoSignup();
  }, []);

	let routes = '';
	if (props.isAuthenticated) {
		routes = (
			<Switch>
				<Route path="/Auth" render={(props) => <Auth {...props} />} />
				<Route path="/" exact render={(props) => <HomePage {...props} />} />
				{/* <Redirect to="/" /> */}
			</Switch>
		)
	} else {
		routes = (
			<Switch>
				<Route path="/Auth" render={(props) => <Auth {...props} />} />
				<Route path="/" exact render={(props) => <HomePage {...props} />} />
				{/* <Redirect to="/" /> */}
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