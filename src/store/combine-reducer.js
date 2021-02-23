import {combineReducers} from 'redux';
import userReducer from '../containers/auth/user-reducer';
import removeUser from '../containers/auth/user-reducer';

export default combineReducers({
  userReducer,
  removeUser,
});
