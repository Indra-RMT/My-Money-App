import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import classes from './Home.css';
import * as actions from '../../store/actions/index';
import { nowDate, toCommas } from '../../shared/utility';
import Container from '../../components/UI/Container/Container';
import Card from '../../components/UI/Card/Card';
import TransactionsHistory from './TransactionsHistory/TransactionsHistory';
import TransactionHandler from './TransactionHandler/TransactionHandler';
import Toast from '../UI/Toast/Toast';
import Skeleton from '../../components/UI/Skeleton/Skeleton';
import FetchFailed from '../UI/FetchFailed/FetchFailed';
 
const Home = (props) => {
  const [isModalTransactionOpen, setModalTransactionOpen] = useState(false);

  useEffect(() => {
    if (props.userId) {
      props.onReadAllTransaction(props.userId);
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

  let initBallance = <Skeleton height="56px" isAlignRight={true} />;
  let initIncome = <Skeleton height="16px" isAlignRight={false} light />;
  let initSpend = <Skeleton height="16px" isAlignRight={false} light />;

  if(Array.isArray(props.allTransaction)) {
    const [ballance, income, spend] = calculateBallance(props.allTransaction);
    initBallance = toCommas(ballance).toString();
    initIncome = toCommas(income).toString();
    initSpend = toCommas(spend).toString(); 
  }

  const closeModalHandler = (event) => {
    if (event.key === "Escape") {
      setModalTransactionOpen(false);
      props.onSetTransactionToDefault();
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
              allTransaction={props.allTransaction}/>
            </div>
            {/* <div className={classes.LoadMoreWrapper}>
              <button>show all</button>
            </div> */}
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
        show={props.success == 'add'}
        closed={() => props.onSetTransactionToDefault()}
        showTime={2000}>
        Add transaction success
      </Toast>
      <Toast
        type={'Danger'}
        show={props.error === 'add'}
        closed={() => props.onSetTransactionToDefault()}
        showTime={2000}>
        Add transaction failed
      </Toast>
      <Toast
        type={'Success'}
        show={props.success == 'delete'}
        closed={() => props.onSetTransactionToDefault()}
        showTime={2000}>
        Delete transaction success
      </Toast>
      <FetchFailed
        FetchFailedId={'getTransactionFailed'}
        show={props.error === 'read'}/>
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    allTransaction: state.trans.allTransaction,
    success: state.trans.success,
    loading: state.trans.loading,
    error: state.trans.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onReadAllTransaction: (userId) => dispatch(actions.readAllTransaction(userId)),
    onSetTransactionToDefault: () => dispatch(actions.transactionDefault())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);