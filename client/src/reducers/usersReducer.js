import { FETCH_USER, FETCH_USERS } from '../actions/types';
import _ from 'lodash';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return _.keyBy(action.payload, '_id');
    case FETCH_USER:
      return { ...state, [action.payload._id]: action.payload };
    default:
      return state;
  }
};
