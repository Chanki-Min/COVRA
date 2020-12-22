import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import StatusBarGraph from './Graphs/StatusBarGraph';
import PredictionLineGraph from './Graphs/PredictionLineGraph';
import CladeDoughnut from './PieCharts/CladeDoughnut';
import InfoCard from './InfoCards/InfoCard';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));
const nationOptions = ['global', 'Australia', 'Austria', 'Belgium', 'Canada', 'Chile', 'Denmark',
  'Estonia', 'Finland', 'France', 'Germany', 'Greece', 'Hungary',
  'Iceland', 'Ireland', 'Israel', 'Italy', 'Japan', 'Latvia',
  'Lithuania', 'Luxembourg', 'Mexico', 'Netherlands', 'New Zealand',
  'Norway', 'Poland', 'Portugal', 'Republic of Korea', 'Slovakia',
  'Slovenia', 'Spain', 'Sweden', 'Switzerland',
  'United States of America'];

const Dashboard = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <InfoCard
              title="GLOBAL DEATH"
              url={`${process.env.REACT_APP_BACKEND_URL}/nationalDeath`}
              defaultNation="global"
              nationOptions={nationOptions}
              showNationPicker={false}
            />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <InfoCard
              title="GLOBAL CONFIRMED"
              url={`${process.env.REACT_APP_BACKEND_URL}/nationalConfirmed`}
              defaultNation="global"
              nationOptions={nationOptions}
              showNationPicker={false}
            />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <InfoCard
              title="NATIONAL DEATH"
              url={`${process.env.REACT_APP_BACKEND_URL}/nationalDeath`}
              defaultNation="Australia"
              nationOptions={nationOptions}
              showNationPicker
            />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <InfoCard
              title="NATIONAL CONFIRMED"
              url={`${process.env.REACT_APP_BACKEND_URL}/nationalConfirmed`}
              defaultNation="Australia"
              nationOptions={nationOptions}
              showNationPicker
            />
          </Grid>

          <Grid
            item
            lg={12}
            md={12}
            xl={9}
            xs={12}
          >
            <StatusBarGraph
              nationOptions={nationOptions}
            />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <CladeDoughnut
              nationOptions={nationOptions}
              showNationPicker={false}
              defaultNation="global"
            />
          </Grid>
          <Grid
            item
            lg={12}
            md={12}
            xl={9}
            xs={12}
          >
            <PredictionLineGraph
              nationOptions={nationOptions}
            />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <CladeDoughnut
              nationOptions={nationOptions}
              showNationPicker
              defaultNation="Australia"
            />
          </Grid>
        </Grid>

      </Container>

    </Page>
  );
};

export default Dashboard;
