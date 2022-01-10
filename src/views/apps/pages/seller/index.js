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

const defaultCreateModal = {
  isShow: false,
  row: {},
};
const defaultEditModal = {
  isShow: false,
  row: {},
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
  } = useSelector((store) => store.product);

  const [createModal, setCreateModal] = useState(defaultCreateModal);

  const [editModal, setEditModal] = useState(defaultEditModal);

  const [deleteModal, setDeleteModal] = useState(defaultDeleteModal);

  const [query, setQuery] = useState(initialQuery);

  // const [pagination, setPagination] = useState({ page: 1, rowPerPage: 10 });

  useEffect(() => {
    dispatch(productListRequest());
  }, []);

  useEffect(() => {
    if (isCreateSuccess) {
      setCreateModal(defaultCreateModal);
    }
  }, [isCreateSuccess]);

  useEffect(() => {
    if (isUpdateSuccess) {
      setEditModal(defaultEditModal);
    }
  }, [isUpdateSuccess]);

  useEffect(() => {
    if (isDeleteSuccess) {
      setDeleteModal(defaultDeleteModal);
    }
  }, [isDeleteSuccess]);

  const handleCreate = () => {
    setCreateModal({ isShow: true });
  };

  const handleDelete = (row) => {
    setDeleteModal({ row, isShow: true });
  };

  const handleEdit = (row) => {
    setEditModal({ row, isShow: true });
  };

  const columns = useMemo(
    () => productColumns({ handleEdit, handleDelete }),
    []
  );

  const handleInputSubmit = (data, id) => {
    if (createModal.isShow) {
      const payload = { data };
      dispatch(createRequest(payload));
    }

    if (editModal.isShow) {
      const payload = { data, id };
      dispatch(updateRequest(payload));
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
    console.log('obj', obj);
    console.log('query', query);
    console.log('queryObj', queryObj);

    dispatch(productListRequest({ query: queryString }));
  };

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
          <CreateHeader handleSubmit={handleCreate} submit="Create Product" />
        )}
        isLoading={isProductListRequest}
      />
      {createModal.isShow && (
        <ProductModal
          show={createModal.isShow}
          submit={handleInputSubmit}
          row={createModal.row || ''}
          onClose={() =>
            setCreateModal((prevState) => ({ ...prevState, isShow: false }))
          }
        />
      )}
      {editModal.isShow && (
        <ProductModal
          show={editModal.isShow}
          row={editModal.row}
          submit={handleInputSubmit}
          onClose={() =>
            setEditModal((prevState) => ({ ...prevState, isShow: false }))
          }
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
      {/*<Link to={'./createProducts'}>Create Product</Link>*/}
    </div>
  );
};
export default Dashboard;
