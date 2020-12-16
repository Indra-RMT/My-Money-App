import React, { useState } from 'react';

import classes from './Toast.css';
import Container from '../Container/Container';
import { CSSTransition } from 'react-transition-group';

const Toast = (props) => {

  const animationTiming = {
    enter: 400,
    exit: 400
  };

  if(props.show){
    setTimeout(() => { 
      props.closed();
    }, props.showTime);
  }

  let toastClass = [classes.Toast];
  if (props.type) {
    toastClass.push(classes[props.type]);
  }

  if(props.show){
    setTimeout(() => { 
      props.closed();
    }, props.showTime);
  }
 
  return (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={props.show}
      timeout={animationTiming}
      classNames={{
        enter: '',
        enterActive: classes.ToastOpen,
        exit: '',
        exitActive: classes.ToastClosed,
      }}>
      <div className={toastClass.join(' ')}>
        <Container>
          <div className={classes.Text}>{props.children}</div>
        </Container>
      </div>
    </CSSTransition>
  );
}

export default Toast