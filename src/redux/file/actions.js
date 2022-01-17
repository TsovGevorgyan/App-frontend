import { createAction } from 'redux-actions';

export const removeFileRequest = createAction('REMOVEFILE_REQUEST');
export const removeFileSuccess = createAction('REMOVEFILE_SUCCESS');
export const removeFileFailure = createAction('REMOVEFILE_FAILURE');
