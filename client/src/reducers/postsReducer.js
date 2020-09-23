import { FETCH_POSTS, FETCH_POST } from '../actions/types';
import _ from 'lodash';

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return _.chain(action.payload)
        .orderBy((post) => new Date(post.dateCreated), ['desc'])
        .keyBy('_id')
        .value();
    case FETCH_POST:
      return { ...state, [action.payload._id]: action.payload };
    default:
      return state;
  }
};
