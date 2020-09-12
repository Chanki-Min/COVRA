import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  colors, Box
} from '@material-ui/core';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import CountUp from 'react-countup';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  differenceIcon: {
    color: colors.red[900]
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1)
  }
}));

const NationalDeath = ({ className, ...rest }) => {
  const classes = useStyles();
  const [data, setData] = React.useState(undefined);
  const [nation, setNation] = React.useState('Republic of Korea');
  fetch(`http://localhost:5000/nationalDeath?nation=${nation}`)
    .then((response) => response.json())
    .then((cardData) => setData(cardData))
    .catch((e) => console.error(e));

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              NATIONAL DEATH
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              <CountUp
                end={data === undefined ? 0 : parseInt(data.total, 10)}
                separator=","
              />
            </Typography>
          </Grid>
        </Grid>
        <Box
          mt={2}
          display="flex"
          alignItems="center"
        >
          <AddOutlinedIcon className={classes.differenceIcon} />
          <Typography
            className={classes.differenceValue}
            variant="body2"
          >
            <CountUp
              end={data === undefined ? 0 : parseInt(data.sinceYesterday, 10)}
              separator=","
            />
          </Typography>
          <Typography
            color="textSecondary"
            variant="caption"
          >
            Since yesterday
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

NationalDeath.propTypes = {
  className: PropTypes.string
};

export default NationalDeath;
