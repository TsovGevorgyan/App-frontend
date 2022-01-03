import { call, put, takeLatest } from 'redux-saga/effects';
import {
  createRequest,
  createSuccess,
  createFailure,
  listRequest,
  listSuccess,
  listFailure,
  findRequest,
  findSuccess,
  findFailure,
  updateRequest,
  updateSuccess,
  updateFailure,
  deleteRequest,
  deleteSuccess,
  deleteFailure,
} from './actions';
import axios from 'axios';
import instance from '../../axios/instance';

import { apiUrl } from '../../configs';

const URL = `${apiUrl}/product`;

function* create({ payload }) {
  try {
    const response = yield call(() => instance.post(`${URL}`, payload));
    yield put(createSuccess(response.data));
  } catch (e) {
    yield put(createFailure(e?.response?.data?.details[0]));
  }
}

function* list() {
  debugger;
  try {
    const response = yield call(() => instance.get(`${URL}`));
    yield put(listSuccess(response.data));
  } catch (e) {
    yield put(listFailure(e?.response?.data?.details[0]));
  }
}

function* find({ payload }) {
  try {
    const response = yield call(() => instance.get(`${URL}/${payload}`));
    yield put(findSuccess(response.data));
  } catch (e) {
    yield put(findFailure(e?.response?.data.message));
  }
}

function* update({ payload }) {
  // payload = {id:3,data:{name:'tezt'}}
  try {
    const response = yield call(() =>
      instance.put(`${URL}/${payload.id}`, payload.data)
    );
    yield put(updateSuccess(response.data));
  } catch (e) {
    yield put(findFailure(e?.response?.data.message));
  }
}
export default function* () {
  yield takeLatest(createRequest, create);
  yield takeLatest(listRequest, list);
  yield takeLatest(findRequest, find);
  yield takeLatest(updateRequest, update);
}
