import React from 'react';

import classes from './Skeleton.css';

const Skeleton = (props) => {
  
  let styleAlign = '0'
  if (props.isAlignRight) {
    styleAlign = 'auto';
  }

  let classLight = null;
  if (props.light) {
    classLight = classes.LightSkeleton;
  }
  
  return (
    <span className={[classes.Skeleton, classLight].join(' ')}
      style={{
        height: props.height,
        marginLeft: styleAlign
      }}> 
    </span>
  )
}

export default Skeleton