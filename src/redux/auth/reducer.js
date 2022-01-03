import {
  registerRequest,
  registerFailure,
  registerSuccess,
  userCheckRequest,
  userCheckSuccess,
  userCheckFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
} from './actions';
import { handleActions } from 'redux-actions';

const initialState = {
  userAccount: {},
  isRegisterSuccess: false,
  isRegisterFailure: false,
  isRegistering: false,
  isCheckUserSuccess: false,
  isCheckUserFailure: false,
  isCheckedUser: false,
  errorMessage: '',
  emailErrorMessage: '',
  isLoginRequest: false,
  isLoginSuccess: false,
  isLoginFailure: false,
  loginErrorMessage: '',
};

const reducer = handleActions(
  {
    [registerRequest]: (state) => ({
      ...state,
      isRegistering: true,
      isRegisterSuccess: false,
      isRegisterFailure: false,
      userAccount: {},
    }),
    [registerSuccess]: (state, { payload }) => ({
      ...state,
      userAccount: payload,
      isRegistering: false,
      isRegisterSuccess: true,
      isRegisterFailure: false,
    }),
    [registerFailure]: (state, { payload }) => ({
      ...state,
      userAccount: {},
      isRegistering: false,
      isRegisterSuccess: false,
      isRegisterFailure: true,
      errorMessage: payload,
    }),
    [userCheckRequest]: (state) => ({
      ...state,
      isCheckUserSuccess: false,
      isCheckUserFailure: false,
      isCheckedUser: true,
      userAccount: {},
    }),
    [userCheckSuccess]: (state, { payload }) => ({
      ...state,
      userAccount: payload,
      isCheckUserSuccess: true,
      isCheckedUser: false,
      isCheckUserFailure: false,
    }),
    [userCheckFailure]: (state, { payload }) => ({
      ...state,
      isCheckUserFailure: true,
      isCheckedUser: false,
      isCheckUserSuccess: false,
      emailErrorMessage: payload,
    }),
    [loginRequest]: (state) => ({
      ...state,
      isLoginRequest: true,
      isLoginSuccess: false,
      isLoginFailure: false,
      userAccount: {},
    }),
    [loginSuccess]: (state, { payload }) => ({
      ...state,
      userAccount: payload,
      isLoginRequest: false,
      isLoginSuccess: true,
      isLoginFailure: false,
    }),
    [loginFailure]: (state, { payload }) => ({
      ...state,
      userAccount: {},
      isLoginRequest: false,
      isLoginSuccess: false,
      isLoginFailure: true,
      loginErrorMessage: payload,
    }),
  },
  initialState
);

export default reducer;
