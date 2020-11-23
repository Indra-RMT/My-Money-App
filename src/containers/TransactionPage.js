import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation, Redirect, Link } from "react-router-dom";

import * as actions from '../store/actions/index';
import TopNavigationDetail from '../components/Navigation/TopNavigationDetail/TopNavigationDetail';
import Transaction from '../components/Transaction/Transaction';

const TransactionPage = (props) => {
  const location = useLocation();

  useEffect(() => {
    props.onSetTransactionToNull();
    props.onGetTransaction(location.state.transactionId);
  }, []);

  let authRedirect = null;
  if (!props.isAuthenticated) {
    authRedirect = <Redirect to='/Auth' />  
  }
  
  return (
    <React.Fragment>
      {authRedirect}
      <TopNavigationDetail />
      <Transaction />
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    transaction: state.trans.transaction
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetTransactionToNull: () => dispatch(actions.editTransactionToNull()),
    onGetTransaction: (transactionId) => dispatch(actions.getTransactionById(transactionId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionPage);