import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { fetchPostsAndUsers, fetchCurrentUserPosts } from '../actions';
import _ from 'lodash';
import Post from './Post';

class LandingPage extends Component {
  componentDidMount() {
    if (this.props.match.path === '/user-posts') {
      return this.props.fetchCurrentUserPosts();
    }
    this.props.fetchPostsAndUsers();
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
          <Link to={`/post/${post._id}`} key={post._id}>
            <Post
              post={post}
              user={this.props.users[`${post.userId}`]}
              width={320}
              height={200}
            />
          </Link>
        ))}
      </Box>
    );
  }
}

function mapStateToProps({ posts, users }) {
  return { posts, users };
}

export default connect(mapStateToProps, {
  fetchPostsAndUsers,
  fetchCurrentUserPosts,
})(LandingPage);
