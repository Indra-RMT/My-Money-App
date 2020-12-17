import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import classes from './SideDrawer.css';
import NavigationItems from '../NavigationItems/NavigationItems';

const SideDrawer = (props) => {
  const animationTiming = {
    enter: 300,
    exit: 300
  };

  const targetElement = document.querySelector('#SideDrawer');
  if (props.show && targetElement !== null) {
    disableBodyScroll(targetElement);
  } else if (!props.show && targetElement !== null) {
    enableBodyScroll(targetElement);
  }

  return (
    <div id="SideDrawer">
      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={props.show}
        timeout={animationTiming}
        classNames={{
          enter: '',
          enterActive: classes.SideDrawerOpen,
          exit: '',
          exitActive: classes.SideDrawerClosed,
        }}>
        <div className={classes.SideDrawer} id="sideDrawer">
          <section className={classes.HeaderSection}>
            <div className={classes.CircleImage}>
              <img src = "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png" / >
            </div>
            <div className={classes.Name}>Indra Rahmanto</div>
            <div className={classes.Email}>indra.anto42@gmail.com</div>
          </section>
          <section className={classes.PageList}>
            <NavigationItems/>
            <div className={classes.Logout}>
              <button onClick={props.logoutClicked}>Logout</button>
            </div>
          </section>
        </div> 
      </CSSTransition>
    </div>
  );
}

export default SideDrawer;