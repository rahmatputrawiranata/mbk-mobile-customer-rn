import {UPDATE_USER} from '../actions/actionTypes';

const initialState = {
  userData: {},
  loginStatus: -1,
};

const updateUser = (state, action) => {
  let ud = action.userdata;

  return {...state, userdata: Object.assign({}, ud), loginStatus: ud ? 1 : 0};
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return updateUser(state, action);
    default:
      return state;
  }
};

export default userReducer;
