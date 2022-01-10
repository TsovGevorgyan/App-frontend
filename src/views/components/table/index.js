import DataTable from 'react-data-table-component';
import Header from './header';
import Pagination from './pagination';
import { Spinner } from 'reactstrap';
import React from 'react';

const Table = ({
  columns,
  data,
  onPagination,
  page,
  rowPerPage,
  count,
  Button,
  isLoading,
}) => {
  return (
    <div>
      <Header
        onPagination={onPagination}
        page={page}
        rowPerPage={rowPerPage}
        count={count}
        Button={Button}
      />
      {isLoading ? (
        <div className="d-flex align-content-center justify-content-center">
          <Spinner>Loading...</Spinner>
        </div>
      ) : (
        <DataTable columns={columns} data={data} />
      )}
      <Pagination
        onPagination={onPagination}
        page={page}
        rowPerPage={rowPerPage}
        count={count}
      />
    </div>
  );
};

export default Table;
