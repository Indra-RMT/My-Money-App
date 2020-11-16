import React, { useState } from 'react';
import { connect } from 'react-redux';

import classes from './Home.css';
import Container from '../../components/UI/Container/Container';
import Card from '../../components/UI/Card/Card';
import TransactionsHistory from './TransactionsHistory/TransactionsHistory';
import TransactionHandler from './TransactionHandler/TransactionHandler';
import Toast from '../UI/Toast/Toast';
import * as actions from '../../store/actions/index';
 
const Home = (props) => {
  const [isModalTransactionOpen, setModalTransactionOpen] = useState(false);

  const closeModalHandler = (event) => {
    if (event.key === "Escape") {
      setModalTransactionOpen(false);
      props.onSetAddTransactionToDefault();
      window.removeEventListener('keydown', closeModalHandler);
    }
  }

  if (isModalTransactionOpen) {
    window.addEventListener('keydown', closeModalHandler);
  }

  return (
    <React.Fragment>
      <main>
        <article>
          <section className={classes.MyBallanceWrapper}>
            <Container>
            <div className={classes.BallanceText}>Ballance</div>
            <div className={classes.BallanceDate}>Minggu, 24 Januari 2021</div>
            <div className={classes.BallanceNumber}>9.000.000</div>
            </Container>
          </section>
          <section>
            <Container>
              <div className={classes.HighlightWrapper}>
                <Card 
                  type="Ballance">
                  <p>Income</p>
                  <p>20.000.000</p>
                </Card>
                <Card
                  type="Ballance">
                  <p>Spend</p>
                  <p>11.000.000</p>
                </Card>
              </div>
            </Container>
          </section>
        </article>
        <article>
          <Container>
          <section className={classes.LineChartWrapper}>
            <div className={classes.SectionTextHeader}>Progress</div>
            <div className={classes.LineChart}>

            </div>
          </section>
          <section className={classes.RecentWrapper}>
            <div className={classes.SectionTextHeader}>Recent</div>
            <div className={classes.Transactions}>
              <TransactionsHistory />
            </div>
            <div className={classes.LoadMoreWrapper}>
              <button>show all</button>
            </div>
          </section>
          </Container>
        </article>
      </main>
      <button 
        className={classes.FloatingButton}
        onClick={() => setModalTransactionOpen(true)}>
        <div>
          +
        </div>
      </button>
      <TransactionHandler
        show={isModalTransactionOpen}
        closeTransactionHandler={() => setModalTransactionOpen(false)}/>
      <Toast
        type={'Success'}
        show={props.isAddTransactionSuccess}
        closed={() => props.onSetAddTransactionToDefault()}
        showTime={2000}>
        Add transaction success
      </Toast>
      <Toast
        type={'Danger'}
        show={props.isAddTransactionSuccess === false}
        closed={() => props.onSetAddTransactionToDefault()}
        showTime={2000}>
        Add transaction failed
      </Toast>
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    isAddTransactionSuccess: state.trans.isAddTransactionSuccess,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetAddTransactionToDefault: () => dispatch(actions.addTransactionDefault())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);