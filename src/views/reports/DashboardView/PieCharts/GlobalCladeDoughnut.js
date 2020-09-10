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
          colors.yellow[500],
          colors.purple[500],
          colors.red[500],
          colors.brown[500],
          colors.teal[500],
          colors.grey[500],
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: ['S', 'L', 'V', 'G', 'GR', 'GH', 'Other'],
    firstOccurredLoc: ['우한', '베이징', '서울', '도쿄', '테스트', '테스트2', '테스트3'],
    firstOccurredAt: ['2020-02-13', '2020-02-14', '2020-02-15', '2020-02-16', '2020-02-17', '2020-02-18', '2020-02-19'],
    mortality: [10.1, 20.1, 30.1, 40.1, 50.1, 60.1, 0],
   }

  const options = {
    animation: {
      animateRotate: true,
      animateScale: false,
    },
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: true
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
      titleFontColor: theme.palette.text.primary,
      //사용자 지정 툴팁을 만든다
      callbacks: {
        title: (tooltipItem, data) => {
          return `Clade information`
        },
        label: (tooltipItem, data) => {
          return `Clade : ${data.labels[tooltipItem.index]}`
        },
        afterLabel: (tooltipItem, data) => {
          const arr = [];
          arr.push(`Occurrences : ${data.datasets[0].data[tooltipItem.index]}`);
          arr.push(`Mortality : ${data.mortality[tooltipItem.index]}`);
          arr.push(`First occurred location : ${data.firstOccurredLoc[tooltipItem.index]}`)
          arr.push(`First occurred at : ${data.firstOccurredAt[tooltipItem.index]}`)
          return arr.join('\n');
        },
        footer: () => 'data source : GISAID'
      }
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
