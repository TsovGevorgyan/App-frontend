import { combineReducers } from 'redux';
import auth from './auth/reducer';
import product from './product/reducer';
import file from './file/reducer';

export default combineReducers({
  auth,
  product,
  file,
});
