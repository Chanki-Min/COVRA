import React from "react";
import clsx from "clsx";
import {Box, Button, Card, CardContent, CardHeader, colors, Divider, Grow, makeStyles, Popper, Typography, useTheme} from '@material-ui/core';
import {Bar} from "react-chartjs-2";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles(() =>
  ({
    root: {}
  }));

const GlobalStatusGraph = ({className, ...rest}) => {
  const graphViewOptions = ['By days', 'By week', 'By month'];
  const anchorRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const classes = useStyles();
  const theme = useTheme();

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
  }

  //그래프 데이터
  const dataList = [
    {
      //By day
      datasets: [
        {
          backgroundColor: colors.indigo[500],
          data: [216452, 266120, 271234, 242321, 235421, 267432, 254231],
          label: 'Confirmed'
        },
        {
          backgroundColor: colors.red[600],
          data: [4497, 5632, 6434, 4753, 4214, 6432, 7214],
          label: 'Death'
        }
      ],
      labels: ['8/31', '9/1', '9/2', '9/3', '9/4', '9/5', '9,6']
    },
    {
      //By week
      datasets: [
        {
          backgroundColor: colors.indigo[500],
          data: [32, 266120, 271234, 242321, 235421, 267432, 254231],
          label: 'Confirmed'
        },
        {
          backgroundColor: colors.red[600],
          data: [4497, 5632, 6434, 4753, 4214, 6432, 7214],
          label: 'Death'
        }
      ],
      labels: ['3 weeks ago', '2 weeks ago', '1 weeks ago', 'this week', '1 week after', '2 week after', '3 week after']
    },
    {
      //By month
      datasets: [
        {
          backgroundColor: colors.indigo[500],
          data: [1216452, 132, 1271234, 1242321, 1235421, 1267432, 1254231],
          label: 'Confirmed'
        },
        {
          backgroundColor: colors.red[600],
          data: [24497, 15632, 16434, 14753, 14214, 16432, 17214],
          label: 'Death'
        }
      ],
      labels: ['3m', '2m', '1m', 'm', '11m', '22m', '33m']
    }
  ];

  //그래프 표시 옵션
  const options = {
    animationEnabled: true,
    cornerRadius: 0,
    layout: {padding: 0},
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
        title='Global Status & Prediction'
        action={(
          <Box ref={anchorRef}>
            <Button
              endIcon={<ArrowDropDownIcon/>}
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
              {({TransitionProps, placement}) => (
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
      <Divider/>
      <CardContent>
        <Box
          height={400}
          position="relative"
        >
          <Bar
            data={dataList[selectedIndex]}
            options={options}
          />
        </Box>
      </CardContent>
      <Divider/>
      <Box>
        <Typography>
          대충 주의사항이라는 메세지
        </Typography>
      </Box>


    </Card>
  )
};

export default GlobalStatusGraph;
