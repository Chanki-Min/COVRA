import React from "react";
import clsx from "clsx";
import PropTypes from 'prop-types';
import { Doughnut } from "react-chartjs-2";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  makeStyles,
  useTheme
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  }
}));

const GlobalCladeDoughnut = ({className, ...rest}) => {
  const classes = useStyles();
  const theme = useTheme();

  const data = {
    datasets: [
      {
        data: [5326, 3975, 4775, 18946, 29562, 19464, 3685],
        backgroundColor: [
          colors.green[500],
          colors.yellow[600],
          colors.purple[600],
          colors.red[500],
          colors.red[600],
          colors.red[800],
          colors.grey[500],
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: ['S', 'L', 'V', 'G', 'GR', 'GH', 'Other']
  }

  const options = {
    animation: true,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  return(
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Global clade population"/>
      <Divider/>
      <CardContent>
        <Box
          height={300}
          position="relative"
        >
          <Doughnut
            data={data}
            options={options}
          />
        </Box>
      </CardContent>

    </Card>
  )
};

GlobalCladeDoughnut.prototypes = {
  className: PropTypes.string
}

export default GlobalCladeDoughnut;
