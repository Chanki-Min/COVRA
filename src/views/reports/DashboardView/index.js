import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import GlobalDeath from './InfoCards/GlobalDeath';
import Sales from './Sales';
import NationalDeath from './InfoCards/NationalDeath';
import GlobalConfirmed from './InfoCards/GlobalConfirmed';
import NationalConfirmed from './InfoCards/NationalConfirmed';
import TrafficByDevice from './TrafficByDevice';
import GlobalStatusGraph from './Graphs/GolbalStatusGraph';
import GlobalCladeDoughnut from "./PieCharts/GlobalCladeDoughnut";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

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
            <GlobalDeath />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <GlobalConfirmed />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <NationalDeath />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <NationalConfirmed />
          </Grid>


          <Grid
            item
            lg={12}
            md={12}
            xl={9}
            xs={12}
          >
            <GlobalStatusGraph />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <GlobalCladeDoughnut/>
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <TrafficByDevice/>
          </Grid>

        </Grid>

      </Container>

    </Page>
  );
};

export default Dashboard;
