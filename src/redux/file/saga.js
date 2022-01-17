import { call, put, takeLatest } from 'redux-saga/effects';
import {
  removeFileFailure,
  removeFileSuccess,
  removeFileRequest,
} from './actions';
import instance from '../../axios/instance';

import { apiUrl } from '../../configs';
import { productRemoveFile } from '../product/actions';

const URL = `${apiUrl}/file`;

function* remove({ payload = {} }) {
  try {
    yield call(() => instance.delete(`${URL}/${payload.id}`));
    switch (payload.type) {
      case 'product':
        yield put(productRemoveFile(payload.id));
        break;
      default:
        yield put(removeFileFailure('Something went wrong'));
        break;
    }
    yield put(removeFileSuccess());
  } catch (e) {
    console.log(e);
    yield put(removeFileFailure(e?.response?.data?.details[0]));
  }
}

export default function* () {
  yield takeLatest(removeFileRequest, remove);
}
