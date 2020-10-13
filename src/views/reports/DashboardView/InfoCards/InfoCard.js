import React,
{ useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined';
import CountUp from 'react-countup';
import DropDownButton from '../../../../components/DropDownButton';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  positiveDifferenceIcon: {
    color: colors.red[900]
  },
  negativeDifferenceIcon: {
    color: colors.blue[900]
  },
  positiveDifferenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1)
  },
  negativeDifferenceValue: {
    color: colors.blue[900],
    marginRight: theme.spacing(1)
  }
}));

const InfoCard = ({
  className, url, defaultNation, title, showNationPicker, nationOptions, ...rest
}) => {
  const classes = useStyles();
  const [data, setData] = React.useState(undefined);
  const [diff, setDiff] = React.useState(0);
  const [nationIndex, setNationIndex] = React.useState(
    nationOptions.findIndex((v) => v === defaultNation)
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}?nation=${nationOptions[nationIndex]}`);
        if (response.status !== 200) throw new Error('no data');
        const json = await response.json();
        setData(json);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [nationOptions, nationIndex, url]);

  useEffect(() => {
    if (data !== undefined) {
      setDiff(parseInt(data.sinceYesterday, 10));
    }
  }, [data]);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
        >
          <Box
            width="50%"
          >
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
                  {title}
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
          </Box>
          { showNationPicker
            && (
            <Box
              mt={-1.5}
            >
              <DropDownButton
                className={clsx(classes.root, className)}
                itemList={nationOptions}
                selectedIndex={nationIndex}
                onChangeSelectedIndex={(nextIndex) => setNationIndex(nextIndex)}
              />
            </Box>
            )}
        </Box>
        <Box
          mt={2}
          display="flex"
          alignItems="center"
        >
          {
            diff >= 0
              ? <AddOutlinedIcon className={classes.positiveDifferenceIcon} />
              : <RemoveOutlinedIcon className={classes.negativeDifferenceIcon} />
          }
          <Typography
            className={
              diff >= 0
                ? classes.positiveDifferenceValue
                : classes.negativeDifferenceValue
            }
            variant="body2"
          >
            <CountUp
              end={Math.abs(diff)}
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

InfoCard.propTypes = {
  className: PropTypes.string,
  url: PropTypes.string,
  title: PropTypes.string,
  defaultNation: PropTypes.string,
  showNationPicker: PropTypes.bool,
  nationOptions: PropTypes.arrayOf(PropTypes.string)
};

export default InfoCard;
