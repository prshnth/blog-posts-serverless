import axios from 'axios';
import _ from 'lodash';
import {
  FETCH_CURRENT_USER,
  FETCH_USERS,
  FETCH_USER,
  FETCH_POSTS,
  FETCH_POST,
  CREATE_POST,
  DELETE_POST,
  FETCH_CURRENT_USER_POSTS,
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

export const fetchCurrentUserPosts = () => async (dispatch) => {
  const response = await axios.get('/api/user/posts');
  dispatch({ type: FETCH_CURRENT_USER_POSTS, payload: response.data });
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

export const createPost = (values, callback) => async (dispatch) => {
  const response = await axios.post('/api/blogPosts', values);
  callback();
  dispatch({ type: CREATE_POST, payload: response.data });
};

export const deletePost = (id) => async (dispatch) => {
  const response = await axios.delete(`/api/post/${id}`);
  dispatch({ type: DELETE_POST, payload: response.data });
};
