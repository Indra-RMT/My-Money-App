import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation } from "react-router-dom";

import * as actions from '../store/actions/index';

const Transactions = (props) => {
  const location = useLocation();

  useEffect(() => {
    props.onGetTransaction(props.userId, location.state.transactionId)
    console.log(location.state.transactionId);
  }, []);

  return (
    <div>
      Transactions
    </div>
  );
}

const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    transactions: state.trans.transactions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetTransaction: (userId, transactionId) => dispatch(actions.getTransactionById(userId, transactionId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);