import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  makeStyles,
  Typography,
  useTheme
} from '@material-ui/core';
import { Bar } from 'react-chartjs-2';
import _ from 'lodash';
import processFetchData from './ProcessFetchBarData';
import DropDownButton from '../../../../components/DropDownButton';
import capitalize from '../../../../util/capitalize';

const useStyles = makeStyles(() => ({
  root: {}
}));

const StatusBarGraph = ({ className, nationOptions, ...rest }) => {
  const chartRef = React.useRef(null);
  const classes = useStyles();
  const theme = useTheme();
  const [nationIndex, setNationIndex] = React.useState(0);

  const graphViewOptions = ['By days', 'By week', 'By month'];
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [dataList, setDataList] = React.useState([]);
  const dataListClone = _.cloneDeep(dataList);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/nationalStatus?dayQ=15&weekQ=15&monthQ=8&nation=${nationOptions[nationIndex]}`);
        const json = await response.json();
        const processed = await processFetchData(json);
        setDataList(processed);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, [nationOptions, nationIndex]);

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
        title={`${`${capitalize(nationOptions[nationIndex])}'s`} Status`}
        action={(
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <DropDownButton // 나라 선택창
              className={clsx(classes.root, className)}
              itemList={nationOptions}
              selectedIndex={nationIndex}
              onChangeSelectedIndex={(nextIndex) => setNationIndex(nextIndex)}
            />
            <DropDownButton // 조회기간 선택창
              className={clsx(classes.root, className)}
              itemList={graphViewOptions}
              selectedIndex={selectedIndex}
              onChangeSelectedIndex={(nextIndex) => setSelectedIndex(nextIndex)}
            />
          </Box>
        )}
      />
      <Divider />
      <CardContent>
        <Box
          height={400}
          position="relative"
        >
          { dataList.length !== 0
            && (
            <Bar
              data={dataListClone[selectedIndex]}
              options={options}
              ref={chartRef}
            />
            )}
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

StatusBarGraph.propTypes = {
  className: PropTypes.string,
  nationOptions: PropTypes.arrayOf(PropTypes.string)
};

export default StatusBarGraph;
