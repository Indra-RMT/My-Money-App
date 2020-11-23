import React from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import classes from './FetchFailed.css';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';

const FetchFailed = (props) => {

  const targetElement = document.querySelector(props.FetchFailedId);
  if (props.show && targetElement !== null) {
    disableBodyScroll(targetElement);
  } else if (!props.show && targetElement !== null) {
    enableBodyScroll(targetElement);
  }

  return (
    <Modal
      modalId={props.FetchFailedId}
      show={props.show}>
      <div className={classes.Text}>Failed to fetch data</div>
      <Button
        btnType="Success"
        clicked={() => location.reload()}>Reload</Button>
    </Modal>    
  )
}

export default FetchFailed;