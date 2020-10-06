import React,
{ useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
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
import DropDownButton from '../../../../components/DropDownButton';
import capitalize from '../../../../util/capitalize';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  }
}));

const processFetchData = (cladeData) => {
  return (
    {
      datasets: [
        {
          data: cladeData.data,
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
      labels: cladeData.label,
    }
  );
};

const CladeDoughnut = ({
  className, nationOptions, defaultNation, showNationPicker, ...rest
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [nationIndex, setNationIndex] = React.useState(
    nationOptions.findIndex((v) => v === defaultNation)
  );
  const [cladeData, setCladeData] = React.useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/nationalCladeStatus?nation=${nationOptions[nationIndex]}`);
        const json = await response.json();
        const processedData = await processFetchData(json);
        setCladeData(processedData);
      } catch (e) {
        console.error(e.message);
      }
    };
    fetchData();
  }, [nationOptions, nationIndex]);

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
      mode: 'point',
      titleFontColor: theme.palette.text.primary,
      // 사용자 지정 툴팁을 만든다
      callbacks: {
        title: () => {
          console.log('draw');
          return 'clade information';
        },
        label: (tooltipItem, data) => {
          return `Clade : ${data.labels[tooltipItem.index]}`;
        },
        /*
        afterLabel: (tooltipItem, data) => {
          const arr = [];
          arr.push(`Occurrences : ${data.datasets[0].data[tooltipItem.index]}`);
          arr.push(`Mortality : ${data.mortality[tooltipItem.index]}`);
          arr.push(`First occurred location : ${data.firstOccurredLoc[tooltipItem.index]}`);
          arr.push(`First occurred at : ${data.firstOccurredAt[tooltipItem.index]}`);
          return arr.join('\n');
        },
        */
        footer: () => 'data source : GISAID'
      }

    }
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        title={`${capitalize(nationOptions[nationIndex])} clade population`}
        action={showNationPicker
        && (
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
          </Box>
        )}
      />
      <Divider />
      <CardContent>
        <Box
          height={300}
          position="relative"
        >
          <Doughnut
            data={cladeData}
            options={options}
          />
        </Box>
      </CardContent>

    </Card>
  );
};

CladeDoughnut.propTypes = {
  className: PropTypes.string,
  defaultNation: PropTypes.string,
  nationOptions: PropTypes.arrayOf(PropTypes.string),
  showNationPicker: PropTypes.bool
};

export default CladeDoughnut;
