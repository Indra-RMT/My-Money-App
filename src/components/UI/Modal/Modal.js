import React, {useState} from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';

import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

const Modal = (props) => {
  const [modalContent, setModalContent] = useState(false);

  const animationTiming = {
    enter: 400,
    exit: 1000
  };
  
  if (props.show && props.children !== modalContent) {
    setModalContent(props.children);
  }
  
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
            {modalContent}
          </div>
      </CSSTransition>
    </React.Fragment>
  )
}

export default Modal;