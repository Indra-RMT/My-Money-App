import React from 'react';

import classes from './Container.css';

const Container = (props) => {
  return (
    <div className={classes.Container} {...props}>
      {props.children}
    </div>
  )
}

export default Container;