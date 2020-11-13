import React from 'react';

import classes from './SideDrawer.css';

const SideDrawer = (props) => {
  return (
    <React.Fragment>
      <div className={classes.SideDrawer} id="sideDrawer">
        <section className={classes.HeaderSection}>
          <div className={classes.CircleImage}>
            <img src="https://www.w3schools.com/images/colorpicker.gif" />
          </div>
          <div className={classes.Name}>Indra Rahmanto</div>
          <div className={classes.Email}>indra.anto42@gmail.com</div>
        </section>
        <section className={classes.PageList}>
          <ul>
            <li>Home</li>
            <li>Transactions</li>
          </ul>
        </section>
      </div>
    </React.Fragment>
  );
}

export default SideDrawer;

