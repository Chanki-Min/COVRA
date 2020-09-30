import React from 'react';
import clsx from 'clsx';
import moment from 'moment';
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
import {
  Line,
} from 'react-chartjs-2';
import _ from 'lodash';
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import PropTypes from 'prop-types';
import processFetchLineData from './ProcessFetchLineData';
import DropDownButton from '../../../../components/DropDownButton';

const useStyles = makeStyles(() => ({
  root: {}
}));

const PredictionLineGraph = ({ className, nationOptions, ...rest }) => {
  const chartRef = React.useRef(null);
  const classes = useStyles();
  const theme = useTheme();

  const [nationIndex, setNationIndex] = React.useState(0);

  const graphViewOptions = ['By days', 'By week', 'By month'];
  const [endDate, setEndDate] = React.useState(moment());
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [dataList, setDataList] = React.useState([]);
  const dataListClone = _.cloneDeep(dataList);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/nationalPrediction?dayQ=15&weekQ=15&monthQ=8&nation=${nationOptions[nationIndex]}&endDate=${endDate.format('yyyy-MM-DD')}`);
      const json = await response.json();
      const processed = await processFetchLineData(json);
      setDataList(processed);
    } catch (e) {
      console.log(e.message);
    }
  };

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  React.useEffect(() => {
    fetchData().then(() => console.log('data fetched'));
  }, [nationIndex, endDate]);

  // 그래프 표시 옵션
  const options = {
    animationEnabled: true,
    layout: { padding: 0 },
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        boxWidth: 30,
        /*
        generateLabels: (chart) => {
          const { data } = chart;
          if (data.labels.length && data.datasets.length) {
            return data.labels.map((label, i) => {
              const meta = chart.getDatasetMeta(0);
              const style = meta.controller.getStyle(i);

              return {
                text: label,
                fillStyle: style.backgroundColor,
                strokeStyle: style.borderColor,
                lineWidth: style.borderWidth,

                // Extra data used for toggling the correct item
                index: i
              };
            });
          }
          return [];
        }
         */
      }
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        title={`${`${capitalize(nationOptions[nationIndex])}'s`} Prediction`}
        action={(
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardDatePicker
                disableToolbar
                autoOk
                variant="inline"
                format="yyyy-MM-DD"
                margin="small"
                id="date-picker-inline"
                label="Select end date"
                value={endDate}
                onChange={(date) => setEndDate(date)}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                width={1 / 4}
              />
            </MuiPickersUtilsProvider>

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
            <Line
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

PredictionLineGraph.propTypes = {
  className: PropTypes.string,
  nationOptions: PropTypes.arrayOf(PropTypes.string)
};

export default PredictionLineGraph;
