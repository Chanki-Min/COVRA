import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  makeStyles,
  CardHeader
} from '@material-ui/core';
import { GitHub } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    padding: '0',
  },
  avatar: {
    height: 50,
    width: 50,
    marginBottom: 10,
  },
  button: {
    margin: theme.spacing(1),
    fontVariant: 'small-caps'
  },
}));

const Profile = ({ className, user, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <CardHeader
          avatar={(
            <Avatar
              className={classes.avatar}
              src={user.avatarSrc}
            >
              {user.name}
            </Avatar>
          )}
          title={user.name}
          subheader={user.title}
        />
        <Box
          alignItems="start"
          display="flex"
          flexDirection="column"
        >
          {
            user.message.map((paragraph) => {
              return (
                <Typography
                  color="textSecondary"
                  variant="body1"
                  gutterBottom
                >
                  {paragraph}
                </Typography>
              );
            })
          }
        </Box>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<GitHub />}
          href={user.githubLink}
          target="_blank"
        >
          Github Link
        </Button>
      </CardActions>
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
  user: PropTypes.shape({
    avatarSrc: PropTypes.string,
    title: PropTypes.string,
    name: PropTypes.string,
    message: PropTypes.arrayOf(PropTypes.string),
    githubLink: PropTypes.string
  }).isRequired
};

export default Profile;
