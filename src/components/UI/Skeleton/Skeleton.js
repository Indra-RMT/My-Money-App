import React from 'react';

import classes from './Skeleton.css';

const Skeleton = (props) => {
  
  let styleAlign = '0'
  if (props.isAlignRight) {
    styleAlign = 'auto';
  }
  
  return (
    <span className={classes.Skeleton}
      style={{
        height: props.height,
        marginLeft: styleAlign
      }}>
    </span>
  )
}

export default Skeleton