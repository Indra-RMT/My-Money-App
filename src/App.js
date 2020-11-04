import React, { Suspense } from 'react';
import {
  Link,
  Route,
  Switch,
	Redirect,
	withRouter
} from 'react-router-dom';

import Auth from './containers/Auth';

const Users = React.lazy(() => {
  return import('./containers/Users');
});
const Pizza = React.lazy(() => {
  return import('./containers/Pizza');
});

const App = () => {

	const routes = (
		<Switch>
			<Route path="/pizza" render={(props) => <Pizza {...props} />} />
			<Route path="/" exact render={(props) => <Auth {...props} />} />
			<Redirect to="/" />
		</Switch>
	)

	return (
		<div>
			<div>
				<Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
			</div>
		</div>
	);
}

export default withRouter(App);