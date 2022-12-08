import React from 'react'
import ReactPaginate from 'react-paginate'
const PaginationCalculate = ({totalPages,postperPage,currentPage,paginate}) => {

    var display = Math.ceil(totalPages / postperPage)
  return (
    <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={paginate}
        pageCount={display}
        previousLabel="<"
        renderOnZeroPageCount={null}
        className='pagination_ul'
      />
  )
}

export default PaginationCalculate