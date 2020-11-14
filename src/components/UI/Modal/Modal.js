import React, {useState} from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';

import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

const Modal = (props) => {
  const [modalContent, setModalContent] = useState(false);

  const animationTiming = {
    enter: 400,
    exit: 600
  };
  
  if (props.show && props.children !== modalContent) {
    setModalContent(props.children);
  }

  const modalStyleTop = props.styleTop ? {top: props.styleTop} : {top: '30%'};
  const modalStyleWidth = props.styleWidth ? {width: props.styleWidth} : {width: '70%'};
  const style = {...modalStyleTop, ...modalStyleWidth}

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
          <div className={classes.Modal} style={style}>
            {modalContent}
          </div>
      </CSSTransition>
    </React.Fragment>
  )
}

export default Modal;