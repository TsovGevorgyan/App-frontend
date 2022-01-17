import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateHeader from '../../dashboard/sellerDashboard/createHeader';
import { QueryObject } from '../../../../utility/queryObject';

import {
  productListRequest,
  createRequest,
  updateRequest,
  deleteRequest,
} from '../../../../redux/product/actions';
import { productColumns } from '../../../../utility/tableColumns';
import ProductModal from '../../../../modals/product/edit';
import DeleteProductModal from '../../../../modals/product/delete';
import Table from '../../../components/table';
import Search from '../../../components/search/search';
import { searchFields } from '../../../../utility/constants';
import { removeEmptyItemsFromObject } from '../../../../utility';
import usePrevious from '../../../../hooks/usePrevious';

const defaultModal = {
  isShow: false,
  productId: 0,
};

const defaultDeleteModal = {
  isShow: false,
  row: {},
};

const initialQuery = {
  rowPerPage: 10,
  page: 1,
  name: '',
};

const Dashboard = () => {
  const dispatch = useDispatch();

  const {
    userProducts,
    count,
    isUpdateSuccess,
    isDeleteSuccess,
    isCreateSuccess,
    isProductListRequest,
    isProductFailur,
    isUpdateFailure,
    isDeleteFailure,
    isCreateFailure,
    errorMessage,
  } = useSelector((store) => store.product);

  const prevIsUpdateSuccess = usePrevious(isUpdateSuccess);
  const prevIsDeleteSuccess = usePrevious(isDeleteSuccess);
  const prevIsCreateSuccess = usePrevious(isCreateSuccess);
  const prevIsCreateFailure = usePrevious(isCreateFailure);
  const prevIsDeleteFailure = usePrevious(isDeleteFailure);
  const prevIsUpdateFailure = usePrevious(isUpdateFailure);

  const [modal, setModal] = useState(defaultModal);

  const [deleteModal, setDeleteModal] = useState(defaultDeleteModal);

  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    dispatch(productListRequest());
  }, []);

  useEffect(() => {
    if (isCreateSuccess && prevIsCreateSuccess === false) {
      alert('Create Success');
      setModal(defaultModal);
    } else if (isCreateFailure && prevIsCreateFailure === false) {
      alert(errorMessage);
    }
  }, [isCreateSuccess, isCreateFailure]);

  useEffect(() => {
    if (isUpdateSuccess && prevIsUpdateSuccess === false) {
      alert('Update Success');
      setModal(defaultModal);
    } else if (isUpdateFailure && prevIsUpdateFailure === false) {
      alert(errorMessage);
    }
  }, [isUpdateSuccess, isUpdateFailure]);

  useEffect(() => {
    if (isDeleteSuccess && prevIsDeleteSuccess === false) {
      alert('Delete Success');
      setModal(defaultModal);
    } else if (isDeleteFailure && prevIsDeleteFailure === false) {
      alert(errorMessage);
    }
  }, [isDeleteSuccess, isDeleteFailure]);

  useEffect(() => {
    if (isDeleteSuccess) {
      setDeleteModal(defaultDeleteModal);
    }
  }, [isDeleteSuccess]);

  const handleModalOpen = (productId = 0) => {
    console.log('productId', productId);
    setModal({ isShow: true, productId });
  };

  const handleDelete = (row) => {
    setDeleteModal({ row, isShow: true });
  };

  const columns = useMemo(
    () => productColumns({ handleModalOpen, handleDelete }),
    []
  );

  const handleInputSubmit = (id, data) => {
    if (id) {
      dispatch(updateRequest({ data, id }));
    } else {
      dispatch(createRequest(data));
    }
  };

  const handleDeleteSubmit = (id) => {
    const payload = { id };
    dispatch(deleteRequest(payload));
  };

  const onPagination = (newPagination) => {
    const newState = { ...query, ...newPagination };
    setQuery(newState);
    makeSearch(newState);
  };

  const makeSearch = (obj) => {
    const queryObj = obj ? obj : { ...query };
    removeEmptyItemsFromObject(queryObj);
    const queryString = QueryObject(queryObj);
    dispatch(productListRequest({ query: queryString }));
  };
  console.log('row check', modal.row ? Object.keys(modal.row).length : '');
  return (
    <div>
      <Search setQuery={setQuery} search={makeSearch} fields={searchFields} />
      <Table
        columns={columns}
        data={userProducts}
        onPagination={onPagination}
        rowPerPage={query.rowPerPage}
        page={query.page}
        count={count}
        Button={() => (
          <CreateHeader
            handleModalOpen={handleModalOpen}
            buttonName="Create Product"
          />
        )}
        isLoading={isProductListRequest}
      />
      {modal.isShow && (
        <ProductModal
          isEdit={modal.productId}
          show={modal.isShow}
          productId={modal.productId}
          submit={handleInputSubmit}
          onClose={() => setModal(defaultModal)}
        />
      )}
      {deleteModal.isShow && (
        <DeleteProductModal
          show={deleteModal.isShow}
          row={deleteModal.row}
          submit={handleDeleteSubmit}
          onClose={() =>
            setDeleteModal((prevState) => ({ ...prevState, isShow: false }))
          }
        />
      )}
    </div>
  );
};
export default Dashboard;
