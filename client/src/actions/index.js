import axios from 'axios';
import _ from 'lodash';
import {
  FETCH_CURRENT_USER,
  FETCH_USERS,
  FETCH_USER,
  FETCH_POSTS,
  FETCH_POST,
} from './types';

export const fetchCurrentUser = () => async (dispatch) => {
  const response = await axios.get('/api/currentUserInfo');
  dispatch({ type: FETCH_CURRENT_USER, payload: response.data });
};

export const fetchUsers = () => async (dispatch) => {
  const response = await axios.get('/api/users');
  dispatch({ type: FETCH_USERS, payload: response.data });
};

export const fetchUser = (id) => async (dispatch) => {
  const response = await axios.get(`/api/user/${id}`);
  dispatch({ type: FETCH_USER, payload: response.data });
};

export const fetchPosts = () => async (dispatch) => {
  const response = await axios.get('/api/blogPosts');
  dispatch({ type: FETCH_POSTS, payload: response.data });
};

export const fetchPost = (id) => async (dispatch) => {
  const response = await axios.get(`/api/post/${id}`);
  dispatch({ type: FETCH_POST, payload: response.data });
};

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());
  _.chain(getState().posts)
    .map('userId')
    .uniq()
    .each((id) => dispatch(fetchUser(id)))
    .value();
};
