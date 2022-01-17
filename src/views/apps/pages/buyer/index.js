import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';

import {
  productListRequest,
  updateRequest,
  deleteRequest,
} from '../../../../redux/product/actions';
import { productColumns } from '../../../../utility/tableColumns';
import EditProductModal from '../../../../modals/product/edit';
import DeleteProductModal from '../../../../modals/product/delete';

const defaultEditModal = {
  isShow: false,
  row: {},
};
const defaultDeleteModal = {
  isShow: false,
  row: {},
};

const Dashboard = () => {
  const dispatch = useDispatch();

  const { userProducts, isUpdateSuccess, isDeleteSuccess } = useSelector(
    (store) => store.product
  );

  const [editModal, setEditModal] = useState(defaultEditModal);

  const [deleteModal, setDeleteModal] = useState(defaultDeleteModal);

  useEffect(() => {
    dispatch(productListRequest());
  }, []);

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

  const handleEditSubmit = (data, id) => {
    const payload = { data, id };
    dispatch(updateRequest(payload));
  };

  const handleDeleteSubmit = (id) => {
    const payload = { id };
    dispatch(deleteRequest(payload));
  };
  return (
    <div>
      <DataTable columns={columns} data={userProducts} />
      {editModal.isShow && (
        <EditProductModal
          show={editModal.isShow}
          row={editModal.row}
          submit={handleEditSubmit}
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
    </div>
  );
};
export default Dashboard;
