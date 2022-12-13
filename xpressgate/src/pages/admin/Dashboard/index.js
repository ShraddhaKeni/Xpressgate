import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
const AdminDashboard = () => {

    /*
    SAMPLE USAGE OF THE API
    
    useEffect(async () => {

        await fetchUser();



    }, [])*/



    return (
        <>


            <Container fluid className='dashboard-card-row'>

                <Col>
                    <div className='card-green w-40 pb-5 pt-4'>
                        <p className='dash-heading'>Total Revenue</p>
                        <span className='dash-heading'>₹ 1,70,22,920</span>
                    </div>
                    <div className='card-green-border w-40'>
                        <div className='card-green mx-4 px-4'>
                            <div className='d-flex align-items-center'>
                                <div className='icon-bg-white-round'>
                                    <img className='dash-icon' src='../images/icon_latest_premises.svg' />
                                </div>
                                <p className='dash-heading-sm pl-4 font-weight-bold'>Latest Premises</p>
                            </div>
                        </div>
                        <div className='ml-8 last-space'>
                            <div className='dashboard-space-between'><p>Greenwood</p><p><VisibilityOutlinedIcon /></p></div>
                            <div className='dashboard-space-between'><p>Greenwood</p><p><VisibilityOutlinedIcon /></p></div>
                            <div className='dashboard-space-between'><p>Greenwood</p><p><VisibilityOutlinedIcon /></p></div>
                            <div className='dashboard-space-between'><p>Greenwood</p><p><VisibilityOutlinedIcon /></p></div>
                        </div>
                    </div>

                </Col>


                <Col>
                    <div className='card-green w-40'>
                        <div className='d-flex align-items-center px-4'>
                            <div className='icon-bg-white-round'>
                                <img className='dash-icon' src='../images/icon_premises.svg' />
                            </div>
                            <div className='center-left'>

                                <div className='float-left'>
                                    <p className='dash-heading-sm'>No of Premises</p>
                                    <p className='dash-heading'>80</p>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='card-green-border w-40'>
                        <div className='card-green mx-4 px-4'>
                            <div className='d-flex align-items-center'>
                                <div className='icon-bg-white-round'>
                                    <img className='dash-icon' src='../images/icon_premises_due.svg' />
                                </div>
                                <p className='dash-heading-sm pl-4 font-weight-bold'>Latest Payments</p>
                            </div>

                        </div>
                        <div className='ml-8 last-space'>
                            <div className='dashboard-space-between'><p>Greenwood</p><p>N/a</p></div>
                            <div className='dashboard-space-between'><p>Greenwood</p><p>N/a</p></div>
                            <div className='dashboard-space-between'><p>Greenwood</p><p>N/a</p></div>
                            <div className='dashboard-space-between'><p>Greenwood</p><p>N/a</p></div>
                        </div>

                    </div>
                </Col>

                <Col>
                    <div className='card-green w-40'>

                        <div className='d-flex align-items-center px-4'>
                            <div className='icon-bg-white-round'>
                                <img className='dash-icon' src='../images/icon_residents.svg' />
                            </div>
                            <div className='center-left'>

                                <div className='float-left'>
                                    <p className='dash-heading-sm'>No of Residents</p>
                                    <p className='dash-heading'>8902</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='card-green w-40 ml-12 align-items-center'>
                        <div className="btn-bg-white">
                            <span className='dash-heading-sm '>Recent Report</span>
                        </div>
                        <div className='ml-8 last-space' style={{ width: '100%' }}>
                            <div className='dashboard-space-between-item' ><p>Greenwood</p><p><VisibilityOutlinedIcon /></p></div>
                            <div className='dashboard-space-between-item'><p>Greenwood</p><p><VisibilityOutlinedIcon /></p></div>
                        </div>
                    </div>
                    <div className='card-green w-40 ml-12 align-items-center'>
                        <div className="btn-bg-white">
                            <span className='dash-heading-sm'>Recent Coupon</span>
                        </div>
                        <div className='ml-8 last-space' style={{ width: '100%' }}>
                            <div className='dashboard-space-between-item' ><p>Greenwood</p><p><VisibilityOutlinedIcon /></p></div>
                            <div className='dashboard-space-between-item'><p>Greenwood</p><p><VisibilityOutlinedIcon /></p></div>
                        </div>
                    </div>

                </Col>


            </Container>



        </>
    )
}

export default AdminDashboard

