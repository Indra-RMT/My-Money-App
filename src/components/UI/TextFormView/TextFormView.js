import React from 'react';

import classes from './TextFormView.css';

const TextFormView = (props) => {
  return (
    <div className={classes.TextFormView}>
      <div className={classes.Label}>
        {props.label}
      </div>
      <div className={classes.Text}>
        {props.children}
      </div>
    </div>
  )
}

export default TextFormView;