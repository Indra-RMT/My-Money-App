import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import classes from './Home.css';
import Container from '../../components/UI/Container/Container';
import Card from '../../components/UI/Card/Card';
import TransactionsHistory from './TransactionsHistory/TransactionsHistory';
import TransactionHandler from './TransactionHandler/TransactionHandler';
import Toast from '../UI/Toast/Toast';
import * as actions from '../../store/actions/index';
import { nowDate, toCommas } from '../../shared/utility';
import Skeleton from '../../components/UI/Skeleton/Skeleton';
 
const Home = (props) => {
  const [isModalTransactionOpen, setModalTransactionOpen] = useState(false);

  useEffect(() => {
    if (props.userId) {
      props.onInitTransactions(props.userId);
    }
  }, [props.userId]);

  const calculateBallance = (transaction) => {
    let income = 0;
    let spend = 0;
    transaction.map(trans => {
      if (trans.transactionType === 'income') {
        income += Number(trans.money);
      }
      if (trans.transactionType === 'spend') {
        spend += Number(trans.money);
      }
    })
    const ballance = income - spend;
    return [ballance, income, spend]
  }

  let initBallance = <Skeleton height="43px" isAlignRight={true} />;
  let initIncome = <Skeleton height="12px" isAlignRight={false} />;
  let initSpend = <Skeleton height="12px" isAlignRight={false} />;

  if(Array.isArray(props.transactions)) {
    const [ballance, income, spend] = calculateBallance(props.transactions);
    initBallance = toCommas(ballance).toString();
    initIncome = toCommas(income).toString();
    initSpend = toCommas(spend).toString(); 
  }

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
            <div className={classes.BallanceDate}>{nowDate()}</div>
            <div className={classes.BallanceNumber}>{initBallance}</div>
            </Container>
          </section>
          <section>
            <Container>
              <div className={classes.HighlightWrapper}>
                <Card 
                  type="Ballance">
                  <p>Income</p>
                  <p>{initIncome}</p>
                </Card>
                <Card
                  type="Ballance">
                  <p>Spend</p>
                  <p>{initSpend}</p>
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
              <TransactionsHistory 
              trsansactions={props.transactions}/>
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
    userId: state.auth.userId,
    transactions: state.trans.transactions,
    isAddTransactionSuccess: state.trans.isAddTransactionSuccess,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitTransactions: (userId) => dispatch(actions.initTransactions(userId)),
    onSetAddTransactionToDefault: () => dispatch(actions.addTransactionDefault())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);