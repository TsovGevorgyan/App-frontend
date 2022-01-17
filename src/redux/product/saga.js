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
import instance from '../../axios/instance';

import { apiUrl } from '../../configs';

const URL = `${apiUrl}/product`;

function* create({ payload }) {
  try {
    const response = yield call(() =>
      instance.post(`${URL}`, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    );
    console.log('sagas payload', response.data);
    yield put(createSuccess(response.data));
  } catch (e) {
    yield put(createFailure(e?.response?.data?.message));
  }
}

function* list({ payload = {} }) {
  try {
    const response = yield call(() =>
      instance.get(`${URL}${payload.query || ''}`)
    );
    console.log('sagas payload', payload);
    console.log('sagas payload', response.data);
    yield put(productListSuccess(response.data));
  } catch (e) {
    console.log(e);
    yield put(productListFailure(e?.response?.data));
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
      instance.put(`${URL}/${payload.id}`, payload.data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    );
    console.log('payload.data', payload.data);
    console.log('response', response.data);
    yield put(
      updateSuccess({
        product: response.data,
      })
    );
  } catch (e) {
    console.log('payload.data', payload.data);
    console.log('payload', payload);
    yield put(updateFailure(e?.response?.data.message));
  }
}

function* remove({ payload }) {
  try {
    yield call(() => instance.delete(`${URL}/${payload.id}`));
    yield put(deleteSuccess(payload));
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
