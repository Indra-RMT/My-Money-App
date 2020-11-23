import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../store/actions/index';

import TopNavigation from '../components/Navigation/TopNavigation/TopNavigation';
import Home from '../components/Home/Home';

const HomePage = (props) => {
  const { onTryAutoSignup } = props;

  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  let authRedirect = null;
  if (!props.isAuthenticated) {
      authRedirect = <Redirect to='/Auth' />
  }

  return (
    <div>
      {authRedirect}
      <TopNavigation />
      <Home />
    </div>
  );
};


const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
