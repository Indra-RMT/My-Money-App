import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import classes from './TransactionHandler.css';
import { updateObject, checkValidity } from '../../../shared/utility';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import * as actions from '../../../store/actions/index';

const FormTransaction = (props) => {
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
      ...defaultStateInput
    }));
    setDateForm(updateObject(dateForm, {
      value: new Date(),
      ...defaultStateInput
    }));
    setMoneyIncomeForm(updateObject(moneyIncomeForm, {
      value: '',
      ...defaultStateInput
    }));
    setDescriptionForm(updateObject(descriptionForm, {
      value: '',
      ...defaultStateInput
    }));
  }

  useEffect(() => {
    refreshForm();
    if (props.transactionType === "Edit") {
      setNameForm(updateObject(nameForm, {
        value: props.transactionData.name,
      }));
      setMoneyIncomeForm(updateObject(moneyIncomeForm, {
        value: props.transactionData.money,
      }));
      setDescriptionForm(updateObject(descriptionForm, {
        value: props.transactionData.description,
      }));
    }
  }, [props.transactionOpen]);

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

    const userInputValue = {
      userId: props.userId,
      transactionType: props.transactionOpen,
      name: nameForm.value,
      date: dateForm.value,
      money: moneyIncomeForm.value,
      description: descriptionForm.value
    }

    if (props.transactionType === "Add") {
      if (isValid) {
        props.onAddTransaction({...userInputValue});
      }
    }
    if (props.transactionType === "Edit") {
      if (isValid) {
        props.onEditTransaction({...userInputValue});
      }
    }
  }
  
  let modalContent = null;
  if (props.show) {
    modalContent = (
      <div className={classes.TransactionHandler}
        >
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

  const changeLabelTextMoneyForm = (target) => {
    setMoneyIncomeForm(
      updateObject(moneyIncomeForm, {
        label: updateObject(moneyIncomeForm.label, {
          text: target
        })
      })
    );
  }

  if (props.transactionOpen === 'income' && moneyIncomeForm.label.text !== 'Money Income') {
    changeLabelTextMoneyForm('Money Income');
  }

  if (props.transactionOpen === 'spend' && moneyIncomeForm.label.text !== 'Money Spend') {
    changeLabelTextMoneyForm('Money Spend');
  }
  
  return (
    <React.Fragment>
      {modalContent}
    </React.Fragment>
  )
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
    onEditTransaction: ({...args}) => dispatch(actions.editTransaction({...args}))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormTransaction);