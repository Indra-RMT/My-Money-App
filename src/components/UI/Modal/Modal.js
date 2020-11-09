import React, {useState} from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';

import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

const Modal = (props) => {
  const [textError, setTextError] = useState(false);

  const animationTiming = {
    enter: 400,
    exit: 1000
  };
  
  if (props.show && props.errorMessage !== textError) {
    setTextError(props.errorMessage);
  }

  const error = (
    <div className={classes.ErrorMessage}>{textError}</div>
  );
  
  return (
    <React.Fragment>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={props.show}
        timeout={animationTiming}
        classNames={{
          enter: '',
          enterActive: classes.ModalOpen,
          exit: '',
          exitActive: classes.ModalClosed,
        }}>
          <div className={classes.Modal}>
            {error}
          </div>
      </CSSTransition>
    </React.Fragment>
  )
}

export default Modal;