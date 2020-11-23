import React from 'react';
import { Link } from 'react-router-dom';

import classes from './TopNavigationDetail.css';
import Container from '../../UI/Container/Container';
import { IconChevronLeft } from '../../UI/Icon/Icon'

const TopNavigationDetail = (props) => {
  return (
    <header className={classes.TopNavigationDetail}>
      <Container>
        <div className={classes.BackLink}>
          <Link to="/" className={classes.s}>
            <IconChevronLeft 
              hexColor="#ffffff"
              width="24px"
              height="16px"/>
          </Link>
        </div>
        <h1>Transaction Info</h1>
      </Container>
    </header>
  )
}

export default TopNavigationDetail;