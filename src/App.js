import React, { Suspense, useEffect } from 'react';
import { connect } from 'react-redux';
import {
	Redirect,
  Route,
  Switch,
	withRouter
} from 'react-router-dom';
import * as actions from './store/actions/index';

import Auth from './containers/Auth';
import HomePage from './containers/HomePage';
import TransactionPage from './containers/TransactionPage';
import ScrollToTop from './components/UI/ScrollToTop/ScrollToTop';

const App = (props) => {
	const { onTryAutoSignup } = props;

  useEffect(() => {
    onTryAutoSignup();
	}, []);
	
	const Page404 = ({ location }) => {
		if (props.isAuthenticated === false) {
			console.log(location)
			const path = location.pathname.toLowerCase();
			if (path === "/transaction" || path === "/transaction/") {
				return (<span></span>);
			}
		}

		return (
			<div>
				<h2>No match found for <code>{location.pathname}</code></h2>
			</div>
		)
	};

	let routes = '';
	if (props.isAuthenticated) {
		routes = (
			<React.Fragment>
				<ScrollToTop />
				<Switch>
					<Route path="/Auth" render={(props) => <Auth {...props} />} />
					<Route path="/Transaction" render={(props) => <TransactionPage {...props}/>} />
					<Route path="/" exact render={(props) => <HomePage {...props} />} />
					<Route component={Page404} />
				</Switch>
			</React.Fragment>
		)
	} else {
		routes = (
			<React.Fragment>
				<ScrollToTop />
				<Switch>
					<Route path="/Auth" render={(props) => <Auth {...props} />} />
					<Route path="/" exact render={(props) => <HomePage {...props} />} />
					<Route component={Page404} />
				</Switch>
			</React.Fragment>
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