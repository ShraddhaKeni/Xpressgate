import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
const Pagination = ({ totalPages, data, settingCurrent,settingPage }) => {

    const [currentPost, setPost] = useState([])
    const [currentPage, setCurrent] = useState(1)
    const [postPerPage, setPerPage] = useState(12)
    const [filterArr, setFilter] = useState([])

    useEffect(() => {
        settingData()
    }, [])
    function settingData() {

        let indexoflast = (currentPage) * postPerPage
        let indexoffirst = (indexoflast - postPerPage)
        setPost(data.slice(indexoffirst, indexoflast))
        settingCurrent(data.slice(indexoffirst, indexoflast))
    }
    function paginate(event) {
        setCurrent(event.selected + 1)
        let indexoflast = (event.selected + 1) * postPerPage
        let indexoffirst = (indexoflast - postPerPage)
        setPost(data.slice(indexoffirst, indexoflast))
        settingCurrent(data.slice(indexoffirst, indexoflast))
        settingPage(event.selected + 1)
    }
    var display = Math.ceil(totalPages / postPerPage)
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

export default Pagination


