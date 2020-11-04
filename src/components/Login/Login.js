import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from './Login.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { updateObject, checkValidity } from '../../shared/utility';
import * as actions from '../../store/actions/index';

const Login = () => {
  const [usernameForm, setUsernameForm] = useState({
    key: 'username',
    label: {
      text: 'Username',
      type: 'Secondary',
    },
    elementType: 'input',
    elementConfig: {
      type: 'input',
      placeholder: ''
    },
    value: '',
    validation: {
      required: true
    },
    valid: false,
    touched: false,
    errorMessage: null
  });

  const [passwordForm, setPasswordForm] = useState({
    key: 'password',
    label: {
      text: 'Password',
      type: 'Secondary',
    },
    elementType: 'password',
    elementConfig: {
      type: 'password',
      placeholder: ''
    },
    value: '',
    validation: {
      required: true
    },
    valid: false,
    touched: false,
    errorMessage: null
  });

  const inputUsernameChangedHandler = (event) => {
    const [isValid, errorMessage] = checkValidity(event.target.value, usernameForm.validation);
    const updatedControls = updateObject( usernameForm, {
      value: event.target.value,
      valid: isValid,
      errorMessage: errorMessage,
      touched: true
    });
    setUsernameForm(updatedControls);
  }

  const inputPasswordChangedHandler = (event) => {
    const [isValid, errorMessage] = checkValidity(event.target.value, passwordForm.validation);
    const updatedControls = updateObject( passwordForm, {
      value: event.target.value,
      valid: isValid,
      errorMessage: errorMessage,
      touched: true
    });
    setPasswordForm(updatedControls);
  }

  const submitHandler = ( event ) => {
    event.preventDefault();
    // props.onAuth( authForm.email.value, authForm.password.value, isSignup );
    if (usernameForm.value === 'indra' && passwordForm.value === 'indra') {

    }
  }

  return (
    <div className={classes.Login}>
      <div className={classes.UpperSection}>
        <header className={classes.HeaderText}>
          <h1>myMoneyApp</h1>
          <h2>Welcome</h2>
        </header>
        <div className={classes.Card}>
          <form onSubmit={submitHandler}>
            <div className={classes.InputWrapper}>
              <Input
                key={usernameForm.key}
                id={usernameForm.key}
                label={usernameForm.label}
                elementType={usernameForm.elementType}
                elementConfig={usernameForm.elementConfig}
                value={usernameForm.value}
                isValid={usernameForm.valid}
                errorMessage={usernameForm.errorMessage}
                touched={usernameForm.touched}
                changed={( event ) => inputUsernameChangedHandler( event, 'Username' )} />
              <Input
                key={passwordForm.key}
                id={passwordForm.key}
                label={passwordForm.label}
                elementType={passwordForm.elementType}
                elementConfig={passwordForm.elementConfig}
                value={passwordForm.value}
                isValid={passwordForm.valid} 
                errorMessage={passwordForm.errorMessage}
                touched={passwordForm.touched}
                changed={( event ) => inputPasswordChangedHandler( event, 'Username' )} />
            </div>
            <div className={classes.ButtonWrapper}>
              <Button
                disabled={false}
                btnType={'Success'}>
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div className={classes.BottomSection}>
        <p>By Indra</p>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
      loading: state.auth.loading,
      error: state.auth.error,
      isAuthenticated: state.auth.token !== null,
      authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
      onAuth: ( email, password, isSignup ) => dispatch( actions.auth( email, password, isSignup ) ),
      onSetAuthRedirectPath: () => dispatch( actions.setAuthRedirectPath( '/' ) )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
