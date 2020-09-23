import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';

const Post = ({ post, user, width, height, showContent }) => {
  const useStyles = makeStyles({
    boxContainer: {
      cursor: 'pointer',
    },
    boxFooter: {
      paddingTop: 10,
      marginTop: 'auto',
      display: 'flex',
    },
    avatar: {
      marginRight: 10,
    },
  });
  const classes = useStyles();

  const getFormattedDate = (date) => {
    return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(
      new Date(date)
    );
  };
  if (_.isEmpty(post) || _.isEmpty(user)) {
    return null;
  }

  return (
    <Box
      width={width}
      maxWidth={800}
      height={height}
      display='flex'
      flexDirection='column'
      bgcolor='text.disabled'
      borderRadius={12}
      m={1}
      px={2}
      pt={2}
      pb={1}
      boxShadow={3}
      className={classes.boxContainer}
    >
      <Typography gutterBottom variant='h5' component='h2' color='primary'>
        {post.title}
      </Typography>
      {showContent ? (
        <Typography variant='subtitle2' gutterBottom>
          {post.content}
        </Typography>
      ) : (
        <Typography variant='subtitle2' gutterBottom>
          {_.truncate(post.description, { length: 200 })}
        </Typography>
      )}
      {!_.isEmpty(user) && (
        <div className={classes.boxFooter}>
          <Avatar
            alt={user.displayName}
            className={classes.avatar}
            src={user.photo}
          />
          <div>
            <Typography variant='subtitle2' display='block'>
              {user.displayName}
            </Typography>
            <Typography variant='caption' display='block' gutterBottom>
              {getFormattedDate(post.dateCreated)}
            </Typography>
          </div>
        </div>
      )}
    </Box>
  );
};

export default Post;
