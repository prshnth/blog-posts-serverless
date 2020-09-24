import React from 'react';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { deletePost } from '../actions';
import _ from 'lodash';

const Post = ({
  post,
  user,
  auth,
  width,
  height,
  showContent,
  deletePost,
  history,
}) => {
  const useStyles = makeStyles({
    titleContainer: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 10,
    },
    deleteIcon: {
      marginLeft: 'auto',
    },
    boxFooter: {
      paddingTop: 10,
      marginTop: 'auto',
      display: 'flex',
    },
    avatar: {
      marginRight: 10,
    },
    textColor: {
      color: '#d0d0e4',
    },
  });
  const classes = useStyles();

  const getFormattedDate = (date) => {
    return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(
      new Date(date)
    );
  };

  const deleteCurrentPost = async () => {
    await deletePost(post._id);
    history.push('/');
  };

  if (_.isEmpty(post) || _.isEmpty(user)) {
    return null;
  }

  return (
    <Box
      width={width}
      maxWidth={800}
      minWidth={320}
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
    >
      <div className={classes.titleContainer}>
        <Typography variant='h5' component='h2' color='primary'>
          {post.title}
        </Typography>
        {showContent && auth._id === post.userId ? (
          <IconButton
            aria-label='delete-post'
            color='secondary'
            className={classes.deleteIcon}
            onClick={deleteCurrentPost}
          >
            <DeleteIcon />
          </IconButton>
        ) : null}
      </div>
      {showContent ? (
        <Typography
          variant='subtitle2'
          gutterBottom
          className={classes.textColor}
        >
          {post.content}
        </Typography>
      ) : (
        <Typography
          variant='subtitle2'
          gutterBottom
          className={classes.textColor}
        >
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
            <Typography
              variant='subtitle2'
              display='block'
              className={classes.textColor}
            >
              {user.displayName}
            </Typography>
            <Typography
              variant='caption'
              display='block'
              gutterBottom
              className={classes.textColor}
            >
              {getFormattedDate(post.dateCreated)}
            </Typography>
          </div>
        </div>
      )}
    </Box>
  );
};

export default connect(null, { deletePost })(Post);
