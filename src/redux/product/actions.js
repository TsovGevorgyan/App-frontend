import { createAction } from 'redux-actions';

export const createRequest = createAction('CREATE_REQUEST');
export const createSuccess = createAction('CREATE_SUCCESS');
export const createFailure = createAction('CREATE_FAILURE');

export const productListRequest = createAction('LIST_REQUEST');
export const productListSuccess = createAction('LIST_SUCCESS');
export const productListFailure = createAction('LIST_FAILURE');

export const findRequest = createAction('FIND_REQUEST');
export const findSuccess = createAction('FIND_SUCCESS');
export const findFailure = createAction('FIND_FAILURE');

export const updateRequest = createAction('UPDATE_REQUEST');
export const updateSuccess = createAction('UPDATE_SUCCESS');
export const updateFailure = createAction('UPDATE_FAILURE');

export const deleteRequest = createAction('DELETE_REQUEST');
export const deleteSuccess = createAction('DELETE_SUCCESS');
export const deleteFailure = createAction('DELETE_FAILURE');

export const productRemoveFile = createAction('PRODUCT_REMOVE_FILE');
