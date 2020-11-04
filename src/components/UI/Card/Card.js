import React from 'react';

import classes from './Card.css';

const Card = (props) => {
  let cardClass= '';
  if (props.type !== null) {
    cardClass = [classes.Card, classes[props.type]];
  }

  return (
    <div className={cardClass.join(' ')}>
      {props.children}
    </div>
  )
};

export default Card;