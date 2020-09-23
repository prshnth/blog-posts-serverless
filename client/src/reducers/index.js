import { combineReducers } from 'redux';
import authReducer from './authReducer';
import postsReducer from './postsReducer';
import usersReducer from './usersReducer';

export default combineReducers({
  auth: authReducer,
  posts: postsReducer,
  users: usersReducer,
});
