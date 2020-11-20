import React, { useState } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { connect } from 'react-redux';

import classes from './TransactionHandler.css';
import Modal from '../../UI/Modal/Modal';
import Input from '../../UI/Input/Input';
import { updateObject, checkValidity } from '../../../shared/utility';
import Button from '../../UI/Button/Button';
import * as actions from '../../../store/actions/index';

const TransactionHandler = (props) => {
  const [transactionOpen, setTransactionOpen] = useState('income');
  const [nameForm, setNameForm] = useState({
    key: 'name',
    label: {
      text: 'Name',
      type: 'Secondary',
    },
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: ''
    },
    value: '',
    validation: {
      required: true,
      maxLength: 100
    },
    valid: false,
    touched: false,
    errorMessage: null
  });

  const [dateForm, setDateForm] = useState({
    key: 'date',
    label: {
      text: 'Date',
      type: 'Secondary',
    },
    elementType: 'datePicker',
    elementConfig: {
      type: '',
      placeholder: ''
    },
    value: new Date(),
    validation: {
      required: true,
      maxLength: 100
    },
    valid: false,
    touched: false,
    errorMessage: null
  });

  const [moneyIncomeForm, setMoneyIncomeForm] = useState({
    key: 'moneyIncome',
    label: {
      text: 'Money Income',
      type: 'Secondary',
    },
    elementType: 'input',
    elementConfig: {
      type: 'number',
      placeholder: '',
    },
    value: '',
    validation: {
      required: true,
      maxLength: 100
    },
    valid: false,
    touched: false,
    errorMessage: null
  });

  const [descriptionForm, setDescriptionForm] = useState({
    key: 'description',
    label: {
      text: 'Description',
      type: 'Secondary',
    },
    elementType: 'textarea',
    elementConfig: {
      type: 'input',
      placeholder: ''
    },
    value: '',
    validation: {
    },
    valid: false,
    touched: false,
    errorMessage: null
  });
  
  const inputChangedHandler = (event, targetForm) => {
    let updatedControls = targetForm;
    if (targetForm.key === 'date') {
      updatedControls = updateObject( targetForm, {
        value: event.target.value ? event.target.value : '123',
        valid: true,
        errorMessage: null,
        touched: true
      });
    } else {
      const [isValid, errorMessage] = checkValidity(event.target.value, targetForm.validation);
      updatedControls = updateObject( targetForm, {
        value: event.target.value,
        valid: isValid,
        errorMessage: errorMessage,
        touched: true
      });
    }
    
    return updatedControls;
  }

  const defaultStateInput = {
    valid: false,
    touched: false,
    errorMessage: null
  }

  const refreshForm = () => {
    setNameForm(updateObject(nameForm, {
      value: '',
      defaultStateInput
    }));
    setDateForm(updateObject(dateForm, {
      value: new Date(),
      defaultStateInput
    }));
    setMoneyIncomeForm(updateObject(moneyIncomeForm, {
      value: '',
      defaultStateInput
    }));
    setDescriptionForm
  }

  const setTransactionToIncome = () => {
    if (transactionOpen !== 'income') {
      refreshForm();
      setTransactionOpen('income');
    }
  }

  const setTransactionToSpend = () => {
    if (transactionOpen !== 'spend') {
      refreshForm();
      setTransactionOpen('spend');
    }
  }

  const targetElement = document.querySelector('#Modal');
  if (props.show && targetElement !== null) {
    disableBodyScroll(targetElement);
  } else if (!props.show && targetElement !== null) {
    enableBodyScroll(targetElement);
  }

  const checkRequiredFormIsFilled = (isValid) => {
    if (nameForm.value === '') {
      setNameForm(
        updateObject(nameForm, {
          touched: true,
          valid: false,
          errorMessage: 'input required'
        })
      );
      isValid = false;
    }
    if (moneyIncomeForm.value === '') {
      setMoneyIncomeForm(
        updateObject(moneyIncomeForm, {
          touched: true,
          valid: false,
          errorMessage: 'input required'
        })
      );
      isValid = false;
    }

    return isValid;
  }
  
  const checkFormIsValid = (preveriousValid) => {
    let isValid = preveriousValid;
    isValid = nameForm.valid && isValid;
    isValid = moneyIncomeForm.valid && isValid;
    return isValid;
  }

  const submitHandler = (event) => {
    event.preventDefault();
    let isValid = true;
    isValid = checkRequiredFormIsFilled(isValid);
    isValid = checkFormIsValid(isValid);

    if (isValid) {
      props.onAddTransaction({
        userId: props.userId,
        transactionType: transactionOpen,
        name: nameForm.value,
        date: dateForm.value,
        money: moneyIncomeForm.value,
        description: descriptionForm.value
      });
    }
  }
  
  let modalContent = null;
  if (props.show) {
    modalContent = (
      <div className={classes.TransactionHandler}>
        <div className={classes.TransBody}>
          <form onSubmit={submitHandler}>
            <Input
              key={nameForm.key}
              id={nameForm.key}
              label={nameForm.label}
              elementType={nameForm.elementType}
              elementConfig={nameForm.elementConfig}
              value={nameForm.value}
              isValid={nameForm.valid}
              errorMessage={nameForm.errorMessage}
              touched={nameForm.touched}
              changed={(event) => {
                const updatedControls = inputChangedHandler(event, nameForm);
                setNameForm(updatedControls);
              }} />
            <Input
              key={dateForm.key}
              id={dateForm.key}
              label={dateForm.label}
              elementType={dateForm.elementType}
              elementConfig={dateForm.elementConfig}
              value={dateForm.value}
              isValid={dateForm.valid}
              errorMessage={dateForm.errorMessage}
              touched={dateForm.touched}
              changed={(event) => {
                const updatedControls = inputChangedHandler(event, dateForm);
                setDateForm(updatedControls);
              }} />
            <Input
              key={moneyIncomeForm.key}
              id={moneyIncomeForm.key}
              label={moneyIncomeForm.label}
              elementType={moneyIncomeForm.elementType}
              elementConfig={moneyIncomeForm.elementConfig}
              value={moneyIncomeForm.value}
              isValid={moneyIncomeForm.valid}
              errorMessage={moneyIncomeForm.errorMessage}
              touched={moneyIncomeForm.touched}
              changed={(event) => {
                const updatedControls = inputChangedHandler(event, moneyIncomeForm);
                setMoneyIncomeForm(updatedControls);
              }} />
            <Input
              key={descriptionForm.key}
              id={descriptionForm.key}
              label={descriptionForm.label}
              elementType={descriptionForm.elementType}
              elementConfig={descriptionForm.elementConfig}
              value={descriptionForm.value}
              isValid={descriptionForm.valid}
              errorMessage={descriptionForm.errorMessage}
              touched={descriptionForm.touched}
              changed={(event) => {
                const updatedControls = inputChangedHandler(event, descriptionForm);
                setDescriptionForm(updatedControls);
              }} />
            <Button btnType="White">Add</Button>
          </form>
        </div>
      </div>
    );
  }

  const modalHeader = (
    <React.Fragment>
      <div>
        Input {transactionOpen === 'income' ? 'Income' : 'Spend'}
      </div>
      <button
        onClick={props.closeTransactionHandler}>X</button>
    </React.Fragment>
  );

  const modalFooter = (
    <React.Fragment>
      <Button 
        btnType="Success"
        clicked={setTransactionToIncome}>Income</Button>
      <Button 
        btnType="Success"
        clicked={setTransactionToSpend}>Spend</Button>
    </React.Fragment>
  )

  const changeLabelTextMoneyForm = (target) => {
    setMoneyIncomeForm(
      updateObject(moneyIncomeForm, {
        label: updateObject(moneyIncomeForm.label, {
          text: target
        })
      })
    );
  }

  if (transactionOpen === 'income' && moneyIncomeForm.label.text !== 'Money Income') {
    changeLabelTextMoneyForm('Money Income');
  }

  if (transactionOpen === 'spend' && moneyIncomeForm.label.text !== 'Money Spend') {
    changeLabelTextMoneyForm('Money Spend');
  }

  return (
    <Modal
      show={props.show}
      styleTop={'8%'}
      styleWidth={'90%'}
      modalClosed={props.closeTransactionHandler}
      modalHeader={modalHeader}
      modalFooter={modalFooter}>
      <div className={classes.TransactionHandlerWrapper}>
        {modalContent}
      </div>
    </Modal>
  );
}

const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddTransaction: ({...args}) => dispatch(actions.addTransaction({...args})),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionHandler);