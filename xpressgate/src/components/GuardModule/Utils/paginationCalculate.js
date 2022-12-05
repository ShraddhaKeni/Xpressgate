import React from 'react'
import ReactPaginate from 'react-paginate'
const PaginationCalculate = ({ totalPages, postperPage, currentPage, paginate, onPageChange }) => {

  var display = Math.ceil(totalPages / postperPage)
  console.log(display);
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      onPageChange={paginate}
      pageCount={display}
      pageRangeDisplayed={true}
      previousLabel="<"
      currentPage={currentPage}
      renderOnZeroPageCount={null}
      className='pagination_ul'
    />
  )
}

export default PaginationCalculate