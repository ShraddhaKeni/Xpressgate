import { ButtonUnstyled } from '@mui/base';
import { Button, Icon, IconButton } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import PaginationCalculate from '../../../components/GuardModule/Utils/paginationCalculate';
import { MaterialButton } from '../components/MaterialButton';

export const CouponsList = () => {

    const navigate = useNavigate();

    const handleAddPremise = (someId) => {
        navigate('/admin/premises/add')
    }

    const handleEditClick = (someId) => {
        navigate('/admin/premises/edit')
    }
    return (
        <div className="addvehiclecontainer">

            <div className='avbackgroundimg center-vertical'>
                <div className='Addvehicledisplay'>
                    <label>Coupons</label>
                </div>
                <div className='table-top-right-content'>
                    <div className='table-search'>
                        <span><img src="/images/vendorlistsearch.svg" alt='search icon'></img></span>
                        <span><input className='search_input' placeholder='Search' onChange={(e) => { }} /></span>
                    </div>
                    <div className="table-add-new-button" onClick={handleAddPremise}>
                        <img src="/images/ic_plus.svg" /> Add new Premise
                    </div>
                </div>

                <div id="cardsection">
                    <div className="row row-cols-1 row-cols-md-3 g-3 mb-5">
                        <div className="col">
                            <div className="card-green ">
                                <div className='d-flex justify-content-end mr-5'><button className='highlight-active p-2 px-3'><span className='dot'></span>Active</button></div>
                                <div>
                                    <p className='dash-heading-sm'>SI001</p>
                                    <p className='dash-heading'>COUPON</p>
                                    <p className='dash-heading-md'>25% OFF</p>
                                    <button type="button" className="btn btn-primary blue-bg">View</button>
                                </div>
                            </div>

                        </div>
                        <div className="col">
                            <div className="card-green">
                                <div className='d-flex justify-content-end mr-5'><button className='highlight-inactive p-2 px-3'><span className='dot-inactive'></span>Inactive</button></div>
                                <div>
                                    <p className='dash-heading-sm'>SI001</p>
                                    <p className='dash-heading'>COUPON</p>
                                    <p className='dash-heading-md'>25% OFF</p>
                                    <button type="button" className="btn btn-primary blue-bg">View</button>
                                </div>
                            </div>

                        </div>
                        <div className="col">
                            <div className="card-green">
                            </div>

                        </div>

                    </div>
                </div>

                <PaginationCalculate totalPages={10} postperPage={20} currentPage={2} paginate={10} />

            </div >
        </div >
    )
}
