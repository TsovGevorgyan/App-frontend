import { call, put, takeLatest } from 'redux-saga/effects';
import {
  createRequest,
  createSuccess,
  createFailure,
  productListRequest,
  productListSuccess,
  productListFailure,
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
  try {
    const response = yield call(() => instance.get(`${URL}`));
    yield put(productListSuccess(response.data));
  } catch (e) {
    yield put(productListFailure(e?.response?.data?.details[0]));
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
  try {
    const response = yield call(() =>
      instance.put(`${URL}/${payload.id}`, payload.data)
    );
    console.log('payload', payload);
    yield put(
      updateSuccess({
        product: response.data,
      })
    );
  } catch (e) {
    console.log(e);

    yield put(updateFailure(e?.response?.data.message));
  }
}

function* remove({ payload }) {
  try {
    const response = yield call(() => instance.delete(`${URL}/${payload.id}`));
    yield put(deleteSuccess({ product: response.data }));
  } catch (e) {
    yield put(deleteFailure(e?.response?.data.message));
  }
}

export default function* () {
  yield takeLatest(createRequest, create);
  yield takeLatest(productListRequest, list);
  yield takeLatest(findRequest, find);
  yield takeLatest(updateRequest, update);
  yield takeLatest(deleteRequest, remove);
}
