import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { fetchPost, fetchUser } from '../actions';
import Post from './Post';
import _ from 'lodash';

class PostDetail extends Component {
  async componentDidMount() {
    const { id } = this.props.match.params;
    await this.props.fetchPost(id);
    this.props.fetchUser(this.props.post.userId);
  }

  render() {
    if (this.props.post && this.props.user) {
      return (
        <Post
          post={this.props.post}
          user={this.props.user}
          auth={this.props.auth}
          history={this.props.history}
          showContent
        />
      );
    }
    return (
      <Typography gutterBottom variant='h5' component='h2'>
        Sorry, content is not available for this post.
      </Typography>
    );
  }
}

function mapStateToProps({ posts, users, auth }, ownProps) {
  const post = _.isEmpty(posts) ? null : posts[ownProps.match.params.id];
  const user = _.isEmpty(post) ? null : users[post.userId];
  return { post, user, auth };
}

export default connect(mapStateToProps, { fetchPost, fetchUser })(PostDetail);
