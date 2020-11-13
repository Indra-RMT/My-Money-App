import React from 'react';

import classes from './Home.css';
import Container from '../../components/UI/Container/Container';
import Card from '../../components/UI/Card/Card';
import TransactionsHistory from './TransactionsHistory/TransactionsHistory';
 
const Home = (props) => {
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
      <button className={classes.FloatingButton}>
        <div>
          +
        </div>
      </button>
    </React.Fragment>
  );
}

export default Home;