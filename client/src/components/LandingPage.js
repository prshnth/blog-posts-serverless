import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Avatar } from '@material-ui/core';
import { fetchPostsAndUsers } from '../actions';
import _ from 'lodash';

const withStyles = (Component) => (props) => {
  const useStyles = makeStyles({
    boxContainer: {
      cursor: 'pointer',
    },
    boxFooter: {
      marginTop: 'auto',
      display: 'flex',
    },
    avatar: {
      marginRight: 10,
    },
  });
  const classes = useStyles();
  return <Component {...props} classes={classes} />;
};

class LandingPage extends Component {
  componentDidMount() {
    this.props.fetchPostsAndUsers();
  }
  getFormattedDate(date) {
    return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(
      new Date(date)
    );
  }
  render() {
    if (this.props.posts === null) {
      return <CircularProgress />;
    }
    if (_.isEmpty(this.props.posts)) {
      return (
        <Typography gutterBottom variant='h5' component='h2'>
          Sorry, there are no posts available at this time.
        </Typography>
      );
    }
    return (
      <Box
        maxWidth={800}
        display='flex'
        justifyContent='center'
        flexWrap='wrap'
      >
        {_.map(this.props.posts, (post) => (
          <Box
            width={320}
            height={200}
            display='flex'
            flexDirection='column'
            bgcolor='text.disabled'
            borderRadius={12}
            m={1}
            px={2}
            pt={2}
            pb={1}
            boxShadow={3}
            className={this.props.classes.boxContainer}
          >
            <Typography
              gutterBottom
              variant='h5'
              component='h2'
              color='primary'
            >
              {post.title}
            </Typography>
            <Typography variant='subtitle2' gutterBottom>
              {_.truncate(post.description, { length: 150 })}
            </Typography>
            {this.props.users[`${post.userId}`] && (
              <div className={this.props.classes.boxFooter}>
                <Avatar
                  alt='Cindy Baker'
                  className={this.props.classes.avatar}
                  src={this.props.users[`${post.userId}`].photo}
                />
                <div>
                  <Typography variant='subtitle2' display='block'>
                    {this.props.users[`${post.userId}`].displayName}
                  </Typography>
                  <Typography variant='caption' display='block' gutterBottom>
                    {this.getFormattedDate(post.dateCreated)}
                  </Typography>
                </div>
              </div>
            )}
          </Box>
        ))}
      </Box>
    );
  }
}

function mapStateToProps({ posts, users }) {
  return { posts, users };
}

export default compose(
  withStyles,
  connect(mapStateToProps, { fetchPostsAndUsers })
)(LandingPage);
