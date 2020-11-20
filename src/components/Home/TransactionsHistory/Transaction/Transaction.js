import React from 'react';

import classes from './Transaction.css';
import { IconUp, IconDown } from '../../../UI/Icon/Icon'

const Transaction = (props) => {
  let transactionIcon = (
    <IconUp 
      hexColor='#718AC9'
      width='32'
      height='32'/>
  )
  
  if (props.type === 'spend') {
    transactionIcon = (
      <IconDown 
        hexColor='#D05656'
        width='32'
        height='32'/>
    )
  }

  return (
    <div 
      className={classes.Transaction}
      onClick={props.clicked}>
      <div className={classes.LeftWrapper}>
        <div>{transactionIcon}</div>
        <div>{props.money}</div>
      </div>
      <div className={classes.NameWrapper}>
        <div>{props.name}</div>
      </div>
    </div>
  );
}

export default Transaction;

