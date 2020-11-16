import React, { useState, useEffect } from 'react';

import classes from './TopNavigation.css';
import Container from '../../UI/Container/Container';
import SideDrawer from '../SideDrawer/SideDrawer';
import Backdrop from '../../UI/Backdrop/Backdrop';

const TopNavigation = (props) => {
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);

  const buttonNavClickHandler = () => {
    setIsSideDrawerOpen(!isSideDrawerOpen);
  }

  const closeModalHandler = (event) => {
    if (event.key === "Escape") {
      setIsSideDrawerOpen(false);
      window.removeEventListener('keydown', closeModalHandler);
    }
  }

  if (isSideDrawerOpen) {
    window.addEventListener('keydown', closeModalHandler);
  }

  return (
    <nav className={classes.TopNavigation}>
      <Container>
        <header className={classes.Header}>
          myMoneyApp
          <span className={classes.HeaderDash}></span>
        </header>
        <ul className={classes.NavigationItem}>
          <li 
            className={[classes.NavigationItems, classes.BurgerIcon].join(' ')}>
            <button onClick={() => buttonNavClickHandler()}>☰</button>
          </li>
        </ul>
      </Container>
      <Backdrop
          show={isSideDrawerOpen}
          clicked={() => setIsSideDrawerOpen(!isSideDrawerOpen)}/>
      <SideDrawer 
        show={isSideDrawerOpen}/>
    </nav>
  )
}

export default TopNavigation;