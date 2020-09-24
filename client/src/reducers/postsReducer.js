import {
  FETCH_POSTS,
  FETCH_POST,
  CREATE_POST,
  DELETE_POST,
  FETCH_CURRENT_USER_POSTS,
} from '../actions/types';
import _ from 'lodash';

const sortList = (list) =>
  _.chain(list)
    .orderBy((post) => new Date(post.dateCreated), ['desc'])
    .keyBy('_id')
    .value();

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return sortList(action.payload);
    case FETCH_POST:
      return { ...state, [action.payload._id]: action.payload };
    case FETCH_CURRENT_USER_POSTS:
      return sortList(action.payload);
    case CREATE_POST:
      return { ...state, [action.payload._id]: action.payload };
    case DELETE_POST:
      return sortList(action.payload);
    default:
      return state;
  }
};
