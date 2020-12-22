import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  makeStyles,
  Typography,
  Dialog,
  DialogContent,
} from '@material-ui/core';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import withStyles from '@material-ui/core/styles/withStyles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Profile from './Profile';

const useStyles = makeStyles(() => ({
  root: {},
  dialogBox: {
    display: 'flex',
    alignItems: 'stretch'
  },
  avatar: {
    width: 60,
    height: 60
  }
}));

const WhiteTextTypography = withStyles({
  root: {
    color: '#FFFFFF'
  }
})(Typography);

const TopBar = ({
  className,
  onMobileNavOpen,
  ...rest
}) => {
  const classes = useStyles();
  const [showCredit, setShowCredit] = React.useState(false);

  const handleOpen = () => setShowCredit(true);
  const handleClose = () => setShowCredit(false);

  const profileChanki = {
    avatarSrc: '/static/images/avatars/avatar_1.png',
    title: '홍익대학교 3학년, 프론트,백엔드,데이터수집',
    name: '민찬기',
    message: [
      '이번 프로젝트는 KSB 인공지능 프레임워크/플랫폼(BeeAI) 활용 공모전 출품작입니다. 프론트와 백엔드간 코드 재활용 등을 고려하여 Js, React, Node.js를 사용하였습니다.',
      '처음 사용하는 언어, 프레임워크를 사용하여 미숙하고 엉성한 부분이 많지만, 예쁘게 봐 주셨으면 좋겠습니다. 감사합니다!'
    ],
    githubLink: 'https://github.com/Chanki-Min',
  };

  return (
    <AppBar
      className={clsx(classes.root, className)}
      elevation={0}
      {...rest}
    >
      <Toolbar>
        <RouterLink to="/">
          <WhiteTextTypography
            component="h1"
            variant="h2"
          >
            COVRA covid-19 dashboard
          </WhiteTextTypography>
        </RouterLink>

        <Box flexGrow={1} />
        <IconButton
          color="inherit"
          onClick={handleOpen}
        >
          <SupervisedUserCircleIcon />
        </IconButton>
        <Dialog
          open={showCredit}
          onClose={handleClose}
          maxWidth="md"
          fullWidth
          aria-labelledby="customized-dialog-title"
        >
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              Credit
            </Typography>
          </DialogTitle>
          <DialogContent
            className={classes.dialogBox}
            dividers
          >
            <Profile
              user={profileChanki}
            />

            <Profile
              user={profileChanki}
            />
          </DialogContent>
        </Dialog>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default TopBar;
