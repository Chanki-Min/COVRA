import { colors } from '@material-ui/core';
import moment from 'moment';

const TIME_FORMAT = 'YYYY-MM-DD';

const typeBackGroundColor = {
  death: colors.red[500],
  deathPrediction: colors.red[500],
  confirmed: colors.indigo[500],
  confirmedPrediction: colors.indigo[500],
};

const makeDataSet = (datasetOrigin, type) => {
  return ({
    backgroundColor: typeBackGroundColor[type],
    borderColor: typeBackGroundColor[type],
    fill: false,
    borderDash: [15, 5],
    borderWidth: 3,
    lineTension: 0,
    data: datasetOrigin,
    label: type
  });
};

const makeDateLabels = (from, to, type) => {
  const labels = [];
  const curr = moment(from, TIME_FORMAT);
  const end = moment(to, TIME_FORMAT).add(1, type);
  while (curr.isBefore(end, type)) {
    labels.push(curr.format(TIME_FORMAT));
    curr.add(1, type);
  }
  return labels;
};

const makeDataListEntity = (byData, type) => {
  const datasets = [];
  datasets.push(makeDataSet(byData.death, 'deathPrediction'));
  datasets.push(makeDataSet(byData.confirmed, 'confirmedPrediction'));
  return (
    {
      datasets,
      labels: makeDateLabels(byData.from, byData.to, type),
    }
  );
};

const ProcessFetchLineData = async (fetchData) => {
  const dataList = [];
  dataList.push(makeDataListEntity(fetchData.byDay, 'days'));
  dataList.push(makeDataListEntity(fetchData.byWeek, 'weeks'));
  dataList.push(makeDataListEntity(fetchData.byMonth, 'months'));
  return dataList;
};

export default ProcessFetchLineData;
