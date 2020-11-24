import React, { useState } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import classes from './TransactionHandler.css';
import Modal from '../../UI/Modal/Modal';
import Button from '../../UI/Button/Button';
import FormTransaction from './FormTransaction';

const TransactionHandler = (props) => {
  const [transactionOpen, setTransactionOpen] = useState('income');

  const modalHeader = (
    <React.Fragment>
      <div>
        Input {transactionOpen === 'income' ? 'Income' : 'Spend'}
      </div>
      <button
        onClick={props.closeTransactionHandler}>X</button>
    </React.Fragment>
  );

  const setTransactionToIncome = () => {
    if (transactionOpen !== 'income') {
      setTransactionOpen('income');
    }
  }

  const setTransactionToSpend = () => {
    if (transactionOpen !== 'spend') {
      setTransactionOpen('spend');
    }
  }

  const modalFooter = (
    <React.Fragment>
      <Button 
        btnType={transactionOpen == 'income'? 'SwitchPrimary' : 'SwitchSecondary'}
        clicked={setTransactionToIncome}>Income</Button>
      <Button 
        btnType={transactionOpen == 'spend'? 'SwitchPrimary' : 'SwitchSecondary'}
        clicked={setTransactionToSpend}>Spend</Button>
    </React.Fragment>
  )

  const targetElement = document.querySelector('#modalTransaction');
  if (props.show && targetElement !== null) {
    disableBodyScroll(targetElement);
  } else if (!props.show && targetElement !== null) {
    enableBodyScroll(targetElement);
  }

  return (
    <Modal
      modalId={'modalTransaction'}
      show={props.show}
      styleTop={'1.5%'}
      styleWidth={'95%'}
      modalClosed={props.closeTransactionHandler}
      modalHeader={modalHeader}
      modalFooter={modalFooter}>
      <div className={classes.TransactionHandlerWrapper}>
        <FormTransaction 
          transactionOpen={transactionOpen}
          show={props.show}
          transactionType="Add"/>
      </div>
    </Modal>
  );
}



export default TransactionHandler;