import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

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
      isEmail: true,
      maxLength: 100
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
      required: true,
      minLength: 6,
      maxLength: 35
    },
    valid: false,
    touched: false,
    errorMessage: null
  });

  const [isSignup, setIsSignUp] = useState(false);
  const [showModalMessage, setShowModalMessage] = useState(false);

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

  const checkAllFormIsValid = () => {
    let isValid = true;
    isValid = emailForm.valid;
    isValid = passwordForm.valid && isValid;
    return isValid;
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

    isValid = checkAllFormIsValid() && isValid; 

    if (isValid) {
      props.onAuth(emailForm.value, passwordForm.value, isSignup);
    }
  }

  const resetFormToDefault = () => {
    const defaultForm = {
      value: '',
      valid: false,
      touched: false,
      errorMessage: null
    };

    setEmailForm(updateObject(emailForm, defaultForm));
    setPasswordForm(updateObject(passwordForm, defaultForm));
  }

  const clickOptionHandler = () => {
    resetFormToDefault();
    setIsSignUp(!isSignup);
  }

  const closeModal = () => {
    props.onSetAuthErrorFalse();
    setShowModalMessage(false);

    if (props.signupStatus) {
      props.onSetSignupStatusFalse();
    }
  }

  let modalMessage = null;
  if(props.error){
    switch(props.error.message.split(" ")[0]){
      case 'INVALID_EMAIL':
        modalMessage = 'Email or password is incorrect';
        break;
      case 'INVALID_PASSWORD':
        modalMessage = 'Email or password is incorrect';
        break;
      case 'EMAIL_NOT_FOUND':
        modalMessage = 'Email or password is incorrect';
        break;
      case 'EMAIL_EXISTS':
        modalMessage = 'Email account already exists';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        modalMessage = 'Too many attempts, try again later';
        break;
    }

    if (!showModalMessage) {
      setShowModalMessage(true);
    }
  }


  if (props.signupStatus) {
    modalMessage = 'Register Success, now you can login';

    if (!showModalMessage) {
      setShowModalMessage(true)
    }
  }

  let authRedirect = null;
  if ( props.isAuthenticated ) {
    authRedirect = <Redirect to={props.authRedirectPath} />
  }

  const closeModalHandler = (event) => {
    if (event.key === "Escape") {
      closeModal();
      window.removeEventListener('keydown', closeModalHandler);
    }
  }

  if (showModalMessage) {
    window.addEventListener('keydown', closeModalHandler);
  }

  return (
    <div className={classes.Login}>
      {authRedirect}
      <Modal 
        show={showModalMessage}
        modalClosed={() => closeModal()}>
        <div className={classes.ModalMessage}>{modalMessage}</div>
      </Modal>
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
              <p>{isSignup ? 'have an account?' : 'not have account yet?'} <span 
                className={classes.OptionClickable}
                onClick={() => clickOptionHandler()}>{isSignup ? 'Login' : 'Register'}</span></p>
            </div>
            <div className={classes.ButtonWrapper}>
            <Button
              disabled={props.loading}
              btnType={'Success'}>
              {isSignup ? 'Register' : 'Login'}
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
    authRedirectPath: state.auth.authRedirectPath,
    signupStatus: state.auth.signupStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
    onSetAuthErrorFalse: () => dispatch(actions.setAuthErrorFalse()),
    onSetSignupStatusFalse: () => dispatch(actions.setSignupStatus(false))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
