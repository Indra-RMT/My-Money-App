import React, { useState } from 'react';
import { withRouter } from 'react-router-dom'

import Transaction from './Transaction/Transaction';

const TransactionsHistory = (props) => {
  const transactionClickedHandler = (transId) => {
    props.history.push({
      pathname: '/transaction/',
      state: {
        transactionId: transId
      }
    });
    // console.log(transId);
  }

  let transactionList = null;
  if (props.trsansactions) {
    const sortedTransactions = props.trsansactions.sort((a, b) => {
      return b.date - a.date;
    });
    const lastTransactions = sortedTransactions.slice(0, 5);
    transactionList = lastTransactions.map(trans => (
      <Transaction
        key={trans.id}
        id={trans.id}
        type={trans.transactionType}
        name={trans.name}
        date={trans.date}
        money={trans.money}
        clicked={() => transactionClickedHandler(trans.id)}/>
    ))
  }

  if (Array.isArray(props.trsansactions) && props.trsansactions.length === 0) {
    transactionList = (
      <div style={{
        color: '#aaaaaa',
        marginBottom: '25px',
      }}>no transaction yet</div>
    )
  }

  return (
    <div>
      {transactionList}
    </div>
  );
}

export default withRouter(TransactionsHistory);