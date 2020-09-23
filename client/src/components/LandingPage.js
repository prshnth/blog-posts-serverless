import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Avatar } from '@material-ui/core';
import { fetchPostsAndUsers } from '../actions';
import _ from 'lodash';

const withStyles = (Component) => (props) => {
  const useStyles = makeStyles({
    cardContainer: {
      width: 320,
      height: 200,
      margin: 10,
      display: 'flex',
      flexDirection: 'column',
    },
    cardFooter: {
      marginTop: 'auto',
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
          <Card className={this.props.classes.cardContainer} key={post._id}>
            <CardActionArea>
              <CardContent>
                <Typography
                  gutterBottom
                  variant='h5'
                  component='h2'
                  color='primary'
                >
                  {post.title}
                </Typography>
                <Typography variant='subtitle2' color='textPrimary'>
                  {post.description}
                </Typography>
              </CardContent>
            </CardActionArea>
            {this.props.users[`${post.userId}`] && (
              <CardActions className={this.props.classes.cardFooter}>
                <Avatar
                  alt='Cindy Baker'
                  src={this.props.users[`${post.userId}`].photo}
                />
                <div>
                  <Typography
                    variant='subtitle2'
                    display='block'
                    color='textPrimary'
                  >
                    {this.props.users[`${post.userId}`].displayName}
                  </Typography>
                  <Typography
                    variant='caption'
                    display='block'
                    gutterBottom
                    color='textSecondary'
                  >
                    {this.getFormattedDate(post.dateCreated)}
                  </Typography>
                </div>
              </CardActions>
            )}
          </Card>
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
