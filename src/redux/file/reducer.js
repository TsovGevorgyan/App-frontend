import {
  removeFileSuccess,
  removeFileRequest,
  removeFileFailure,
} from './actions';
import { handleActions } from 'redux-actions';
const initialState = {
  isDeleteSuccess: false,
  isDeleteFailure: false,
  isDeleteRequest: false,
};

const file = handleActions(
  {
    [removeFileRequest]: (state) => ({
      ...state,
      isDeleteRequest: true,
      isDeleteSuccess: false,
      isDeleteFailure: false,
    }),
    [removeFileSuccess]: (state, { payload }) => {
      return {
        ...state,
        isDeleteRequest: false,
        isDeleteSuccess: true,
        isDeleteFailure: false,
      };
    },
    [removeFileFailure]: (state, { payload }) => ({
      ...state,
      isDeleteRequest: false,
      isDeleteSuccess: false,
      isDeleteFailure: true,
      userFile: payload,
    }),
  },
  initialState
);
export default file;
