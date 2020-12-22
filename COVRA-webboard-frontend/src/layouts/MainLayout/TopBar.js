import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  makeStyles, Typography
} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';

const useStyles = makeStyles(({
  root: {},
  toolbar: {
    height: 64
  }
}));

const WhiteTextTypography = withStyles({
  root: {
    color: '#FFFFFF'
  }
})(Typography);

const TopBar = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <AppBar
      className={clsx(classes.root, className)}
      elevation={0}
      {...rest}
    >
      <Toolbar className={classes.toolbar}>
        <RouterLink to="/">
          <WhiteTextTypography
            component="h1"
            variant="h2"
          >
            COVRA covid-19 dashboard
          </WhiteTextTypography>
        </RouterLink>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string
};

export default TopBar;
