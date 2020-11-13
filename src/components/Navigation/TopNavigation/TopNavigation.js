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

  let sideDrawer = null
  if (isSideDrawerOpen) {
    sideDrawer = (
      <React.Fragment>
        <Backdrop
          show={true}
          clicked={() => setIsSideDrawerOpen(!isSideDrawerOpen)}/>
        <SideDrawer 
          show={isSideDrawerOpen}/>
      </React.Fragment>
    )
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
      {sideDrawer}
    </nav>
  )
}

export default TopNavigation;