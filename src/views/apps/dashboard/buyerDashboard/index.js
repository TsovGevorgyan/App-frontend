import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import _ from 'lodash';

import {
  productListRequest,
  updateRequest,
  deleteRequest,
} from '../../../../redux/product/actions';
import { productColumns } from '../../../../utility/tableColumns';
import EditProductModal from '../../../../modals/product/edit';

const defaultEditModal = {
  isShow: false,
  row: {},
};

const Dashboard = () => {
  const dispatch = useDispatch();

  const { userProducts, isUpdateSuccess } = useSelector(
    (store) => store.product
  );

  const [editModal, setEditModal] = useState(defaultEditModal);

  useEffect(() => {
    dispatch(productListRequest());
  }, []);

  useEffect(() => {
    if (isUpdateSuccess) {
      setEditModal(defaultEditModal);
    }
  }, [isUpdateSuccess]);

  const handleDelete = (id) => {
    const payload = { id };
    dispatch(deleteRequest(payload));
    console.log(id);
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
    </div>
  );
};
export default Dashboard;
