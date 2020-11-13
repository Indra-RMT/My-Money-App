import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import {IconHome, IconArrowUpDown} from '../../UI/Icon/Icon';

const NavigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem
        link="/">
        <IconHome
          color={'#000000'}
          width={'32px'}
          height={'32px'}/>
        <div className={classes.PageName}>Home</div>
      </NavigationItem>
      <NavigationItem
        link="/transactions">
        <IconArrowUpDown
          color={'#000000'}
          width={'32px'}
          height={'32px'}/>
        <div className={classes.PageName}>Transactions</div>
      </NavigationItem>
    </ul>
  );
}

export default NavigationItems;