import { call, put, takeLatest } from 'redux-saga/effects';
import {
  registerRequest,
  registerSuccess,
  registerFailure,
  userCheckFailure,
  userCheckRequest,
  userCheckSuccess,
  loginRequest,
  loginSuccess,
  loginFailure,
} from './actions';
import axios from 'axios';

const instance = axios.create({
  headers: { 'Access-Control-Allow-Origin': '*' },
});

const URL = 'http://localhost:5000/api/auth';

function* register({ payload }) {
  try {
    const response = yield call(() =>
      instance.post(`${URL}/register`, payload)
    );
    yield put(registerSuccess(response.data));
  } catch (e) {
    yield put(registerFailure(e?.response?.data?.details[0]));
  }
}

function* login({ payload }) {
  try {
    const response = yield call(() => instance.post(`${URL}/login`, payload));
    yield put(loginSuccess(response.data.user));
    localStorage.setItem('userAccount', JSON.stringify(response.data.user));
    localStorage.setItem('accessToken', response.data.token);
  } catch (e) {
    yield put(loginFailure(e?.response?.data?.details[0]));
  }
}

function* userCheck({ payload }) {
  try {
    const userCheck = yield call(() =>
      instance.get(`${URL}/user_check/${payload}`)
    );
    console.log('payload', payload);
    yield put(userCheckSuccess(userCheck.data));
  } catch (e) {
    console.log('payload', payload);
    yield put(userCheckFailure(e?.response?.data.message));
  }
}
export default function* () {
  yield takeLatest(registerRequest, register);
  yield takeLatest(loginRequest, login);
  yield takeLatest(userCheckRequest, userCheck);
}
