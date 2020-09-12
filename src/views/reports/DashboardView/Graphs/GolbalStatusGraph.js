import React, { useEffect } from 'react';
import clsx from 'clsx';
import {
  Box, Button, Card, CardContent, CardHeader, colors, Divider, Grow, makeStyles, Popper, Typography, useTheme
} from '@material-ui/core';
import { Bar } from 'react-chartjs-2';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import _ from 'lodash';
import processFetchData from './ProcessFetchData';

const useStyles = makeStyles(() => ({
  root: {}
}));

const GlobalStatusGraph = ({ className, ...rest }) => {
  const graphViewOptions = ['By days', 'By week', 'By month'];
  const anchorRef = React.useRef(null);
  const chartRef = React.useRef(null);
  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [dataList, setDataList] = React.useState([]);
  let dataListClone = _.cloneDeep(dataList);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/nationalStatus?dayQ=15&weekQ=15&monthQ=8&nation=global');
      const json = await response.json();
      const processed = await processFetchData(json);
      setDataList(processed);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    console.log('updating data');
    fetchData();
  }, []);

  useEffect(() => {
    console.log('applying data change');
    // state 를 바로 chart.js 에 넘기면 문제가 발생하므로 딥 클론을 생성한다.
    dataListClone = _.cloneDeep(dataList);
  }, [dataList]);

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  // 그래프 표시 옵션
  const options = {
    animationEnabled: true,
    cornerRadius: 0,
    layout: { padding: 0 },
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        boxWidth: 30,
      }
    },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          barThickness: 12,
          maxBarThickness: 10,
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          ticks: {
            fontColor: theme.palette.text.secondary
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          }
        }
      ]
    }
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        title="Global Status & Prediction"
        action={(
          <Box ref={anchorRef}>
            <Button
              endIcon={<ArrowDropDownIcon />}
              size="small"
              variant="text"
              aria-controls={open ? 'split-button-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-label="select merge strategy"
              aria-haspopup="menu"
              onClick={handleToggle}
            >
              {graphViewOptions[selectedIndex]}
            </Button>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal={false}>
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList id="split-button-menu">
                        {graphViewOptions.map((option, index) => (
                          <MenuItem
                            key={option}
                            selected={index === selectedIndex}
                            onClick={(event) => handleMenuItemClick(event, index)}
                          >
                            {option}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}

            </Popper>
          </Box>
        )}
      />
      <Divider />
      <CardContent>
        <Box
          height={400}
          position="relative"
        >
          <Bar
            data={dataListClone[selectedIndex]}
            options={options}
            ref={chartRef}
          />
        </Box>
      </CardContent>
      <Divider />
      <Box
        m={2}
      >
        <Typography
          color="textPrimary"
          variant="h6"
        >
          목차 클릭시 상세보기 가능합니다. 오늘 이후의 데이터는 추정치입니다.
        </Typography>
      </Box>

    </Card>
  );
};

export default GlobalStatusGraph;
