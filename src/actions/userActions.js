import {UPDATE_USER, REMOVE_USER} from './actionTypes';

const updateUser = (userdata) => {
  return {
    type: UPDATE_USER,
    userdata: userdata,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export {updateUser, removeUser};
