import { all } from 'redux-saga/effects';
import auth from './auth/saga';
import product from './product/saga';

function* rootSaga() {
  yield all([auth(), product()]);
  //yield all([product()]);
}

export default rootSaga;
