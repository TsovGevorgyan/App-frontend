import { all } from 'redux-saga/effects';
import auth from './auth/saga';
import product from './product/saga';
import file from './file/saga';

function* rootSaga() {
  yield all([auth(), product(), file()]);
}

export default rootSaga;
