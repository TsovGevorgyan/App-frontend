import { createAction } from 'redux-actions';

export const registerRequest = createAction('REGISTER_REQUEST');
export const registerSuccess = createAction('REGISTER_SUCCESS');
export const registerFailure = createAction('REGISTER_FAILURE');

export const userCheckRequest = createAction('USERCHECK_REQUEST');
export const userCheckSuccess = createAction('USERCHECK_SUCCESS');
export const userCheckFailure = createAction('USERCHECK_FAILURE');

export const loginRequest = createAction('LOGIN_REQUEST');
export const loginSuccess = createAction('LOGIN_SUCCESS');
export const loginFailure = createAction('LOGIN_FAILURE');
