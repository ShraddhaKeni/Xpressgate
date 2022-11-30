import React from 'react'
import { useNavigate } from 'react-router-dom';
import PaginationCalculate from '../../../../components/GuardModule/Utils/paginationCalculate';

export const PlansList = () => {

    const navigate = useNavigate();

    const handleAddPlan = (someId) => {
        navigate('/admin/plans/add')
    }

    const handleEditClick = (someId) => {
        navigate('/admin/plans/edit')
    }
    return (
        <div className="container pb-5">
            <div className='page-label'>
                <label>Subscription Plans</label>
            </div>
            <div className='main-container'>

                <div className='table-top-right-content'>
                    <div className='table-search'>
                        <span><img src="/images/vendorlistsearch.svg" alt='search icon'></img></span>
                        <span><input className='search' placeholder='Search' onChange={(e) => { }} /></span>
                    </div>
                    <div className="table-add-new-button" onClick={handleAddPlan}>
                        <img src="/images/ic_plus.svg" /> Add new Plan
                    </div>
                </div>

                <div id="cardsection">
                    <div className="row row-cols-1 row-cols-md-3 g-3 mb-5">
                        <div className="col">
                            <div className="card-green ">
                                <div className='d-flex justify-content-end mr-5'><button className='highlight-active p-2 px-3'><span className='dot'></span>Active</button></div>
                                <div>
                                    <p className='dash-heading-sm'>SI001</p>
                                    <p className='dash-heading'>PLAN 100</p>
                                    <p className='dash-heading-md'><b>Master Subscription</b></p>
                                    <button type="button" className="btn btn-primary blue-bg">View</button>
                                </div>
                            </div>

                        </div>
                        <div className="col">
                            <div className="card-green">
                                <div className='d-flex justify-content-end mr-5'><button className='highlight-inactive p-2 px-3'><span className='dot-inactive'></span>Inactive</button></div>
                                <div>
                                    <p className='dash-heading-sm'>SI001</p>
                                    <p className='dash-heading'>PLAN 101</p>
                                    <p className='dash-heading-md'><b>Master Subscription</b></p>
                                    <button type="button" className="btn btn-primary blue-bg">View</button>
                                </div>
                            </div>

                        </div>




                    </div>
                </div>

                <PaginationCalculate totalPages={10} postperPage={20} currentPage={2} paginate={10} />

            </div >
        </div >
    )
}
