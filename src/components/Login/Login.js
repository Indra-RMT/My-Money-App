import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import classes from './Login.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Modal from '../../components/UI/Modal/Modal';
import { updateObject, checkValidity } from '../../shared/utility';
import * as actions from '../../store/actions/index';

const Login = (props) => {
  const [emailForm, setEmailForm] = useState({
    key: 'email',
    label: {
      text: 'Email',
      type: 'Secondary',
    },
    elementType: 'input',
    elementConfig: {
      type: 'input',
      placeholder: ''
    },
    value: '',
    validation: {
      required: true,
      isEmail: true
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

  const [isSignup, setIsSignUp] = useState(false);
  const [showModalError, setShowModalError] = useState(false);

  const inputEmailChangedHandler = (event) => {
    const [isValid, errorMessage] = checkValidity(event.target.value, emailForm.validation);
    const updatedControls = updateObject( emailForm, {
      value: event.target.value,
      valid: isValid,
      errorMessage: errorMessage,
      touched: true
    });
    setEmailForm(updatedControls);
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
    let isValid = true;
    if (emailForm.value === '') {
      setEmailForm(
        updateObject(emailForm, {
          touched: true,
          valid: false,
          errorMessage: 'input required'
        })
      );
      isValid = false;
    }
    if (passwordForm.value === '') {
      setPasswordForm(
        updateObject(passwordForm, {
          touched: true,
          valid: false,
          errorMessage: 'input required'
        })
      );
      isValid = false;
    }

    if (isValid) {
      props.onAuth(emailForm.value, passwordForm.value, isSignup);
    }
  }

  const clickOptionHandler = () => {
    setIsSignUp(!isSignup);
  }

  let buttonAuth = <Button
      disabled={false}
      btnType={'Success'}>
      Login
    </Button>

  if (isSignup) {
    buttonAuth = <Button
      disabled={false}
      btnType={'Success'}>
      Register
    </Button>
  }

  const closeModal = () => {
    setShowModalError(false);
    props.onSetAuthErrorFalse();
  }

  let errorMessage = null;
  if(props.error){
    switch(props.error.message){
      case 'INVALID_EMAIL':
        errorMessage = 'Username or password is incorrect';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Username or password is incorrect';
        break;
    }

    if (!showModalError) {
      setShowModalError(true);
    }
  }

  return (
    <div className={classes.Login}>
      <Modal 
        show={showModalError}
        modalClosed={() => closeModal()}
        errorMessage={errorMessage} />
      <div className={classes.UpperSection}>
        <header className={classes.HeaderText}>
          <h1>myMoneyApp</h1>
          <h2>Welcome</h2>
        </header>
        <div className={classes.Card}>
          <form onSubmit={submitHandler}>
            <div className={classes.InputWrapper}>
              <Input
                key={emailForm.key}
                id={emailForm.key}
                label={emailForm.label}
                elementType={emailForm.elementType}
                elementConfig={emailForm.elementConfig}
                value={emailForm.value}
                isValid={emailForm.valid}
                errorMessage={emailForm.errorMessage}
                touched={emailForm.touched}
                changed={(event) => inputEmailChangedHandler(event, 'Email')} />
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
                changed={(event) => inputPasswordChangedHandler(event, 'Password')}/>
            </div>
            <div className={classes.SignOption}>
              <p>not have account yet? <span 
                className={classes.OptionClickable}
                onClick={() => clickOptionHandler()}>{isSignup ? 'Login' : 'Register'}</span></p>
            </div>
            <div className={classes.ButtonWrapper}>
              {buttonAuth}
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
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
    onSetAuthErrorFalse: () => dispatch(actions.setAuthErrorFalse())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
