import {createReducer} from '@reduxjs/toolkit';
import {DataHandler} from '../../utils';
import {makeAction} from '../ActionTypes';

// action creators and types
export const updateUserRole = makeAction('UPDATE_USER_ROLE');

// init state
const initalState = {userRole: false};

// init reducer
export default createReducer(initalState, builder => {
  builder.addCase(updateUserRole, (state, action) => {
    state.userRole = action.payload.userRole;
    DataHandler.setUserRoleStatus(action.payload.userRole);
  });
});

// selectors
export const getUserRole = state => state.userRole.userRole;
