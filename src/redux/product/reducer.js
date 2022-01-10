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
import _ from 'lodash';

import { handleActions } from 'redux-actions';

const initialState = {
  userProducts: [],
  count: 0,
  productItem: {},
  errorMessage: '',
  isCreateSuccess: false,
  isCreateFailure: false,
  isCreateRequest: false,
  isProductRequest: false,
  isProductListSuccess: false,
  isProductListFailure: false,
  isProductListRequest: false,
  isFindProductSuccess: false,
  isFindProductFailure: false,
  isFindProductRequest: false,
  isUpdateSuccess: false,
  isUpdateFailure: false,
  isUpdateRequest: false,
  isDeleteSuccess: false,
  isDeleteFailure: false,
  isDeleteRequest: false,
};

const reducer = handleActions(
  {
    [createRequest]: (state) => ({
      ...state,
      isCreateRequest: true,
      isCreateSuccess: false,
      isCreateFailure: false,
    }),
    [createSuccess]: (state, { payload }) => {
      const copyState = _.cloneDeep(state);
      copyState.userProducts.push(payload.product);
      return {
        ...state,
        userProducts: copyState.userProducts,
        isCreateRequest: false,
        isCreateSuccess: true,
        isCreateFailure: false,
      };
    },
    [createFailure]: (state, { payload }) => ({
      ...state,
      isCreateRequest: false,
      isCreateSuccess: false,
      isCreateFailure: true,
      errorMessage: payload,
    }),
    [productListRequest]: (state) => ({
      ...state,
      isProductListSuccess: false,
      isProductListFailure: false,
      isProductListRequest: true,
    }),
    [productListSuccess]: (state, { payload }) => ({
      ...state,
      userProducts: payload.rows,
      count: payload.count,
      isProductListSuccess: true,
      isProductListFailure: false,
      isProductListRequest: false,
    }),
    [productListFailure]: (state, { payload }) => ({
      ...state,
      isProductListFailure: true,
      isProductListRequest: false,
      isProductListSuccess: false,
      errorMessage: payload,
    }),
    [findRequest]: (state) => ({
      ...state,
      isFindProductRequest: true,
      isFindProductSuccess: false,
      isFindProductFailure: false,
      productItem: {},
    }),
    [findSuccess]: (state, { payload }) => ({
      ...state,
      productItem: payload,
      isFindProductRequest: false,
      isFindProductSuccess: true,
      isFindProductFailure: false,
    }),
    [findFailure]: (state, { payload }) => ({
      ...state,
      isFindProductRequest: false,
      isFindProductSuccess: false,
      isFindProductFailure: true,
      productItem: {},
      errorMessage: payload,
    }),
    [updateRequest]: (state) => ({
      ...state,
      isUpdateRequest: true,
      isUpdateSuccess: false,
      isUpdateFailure: false,
    }),
    [updateSuccess]: (state, { payload }) => {
      return {
        ...state,
        isUpdateRequest: false,
        isUpdateSuccess: true,
        isUpdateFailure: false,
        userProducts: state.userProducts.map((item) =>
          item.id === payload.product.id ? payload.product : item
        ),
      };
    },
    [updateFailure]: (state, { payload }) => ({
      ...state,
      isUpdateRequest: false,
      isUpdateSuccess: false,
      isUpdateFailure: true,
      errorMessage: payload,
    }),
    [deleteRequest]: (state) => ({
      ...state,
      isDeleteRequest: true,
      isDeleteSuccess: false,
      isDeleteFailure: false,
    }),
    [deleteSuccess]: (state, { payload }) => {
      return {
        ...state,
        isDeleteRequest: false,
        isDeleteSuccess: true,
        isDeleteFailure: false,
        userProducts: state.userProducts.filter(
          (item) => item.id !== payload.id
        ),
      };
    },
    [deleteFailure]: (state, { payload }) => ({
      ...state,
      isDeleteRequest: false,
      isDeleteSuccess: false,
      isDeleteFailure: true,
      errorMessage: payload,
    }),
  },
  initialState
);

export default reducer;
