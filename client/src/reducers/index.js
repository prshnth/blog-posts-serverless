import { combineReducers } from 'redux';
import authReducer from './authReducer';
import postsReducer from './postsReducer';
import usersReducer from './usersReducer';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  auth: authReducer,
  posts: postsReducer,
  users: usersReducer,
  form: formReducer,
});
