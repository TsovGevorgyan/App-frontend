import ReactPaginate from 'react-paginate';

const Pagination = ({ onPagination, rowPerPage, count }) => {
  const handlePageClick = ({ selected }) => {
    onPagination({ rowPerPage, page: selected + 1 });
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="next >"
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={Math.ceil(count / rowPerPage)}
      previousLabel="< previous"
      renderOnZeroPageCount={null}
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      breakClassName="page-item"
      breakLinkClassName="page-link"
      containerClassName="pagination"
      activeClassName="active"
    />
  );
};

export default Pagination;
