import React from 'react';
import HeaderSection from '../../../components/GuardModule/Utils/HeaderSection';
import LogOut from '../../../components/GuardModule/Utils/LogOut';
import Header from '../../../components/base/Layout/Header';
import { div } from '@mui/material';
import { Col, Container, Row } from 'react-bootstrap';

const AdminDashboard = () => {

    /*
    SAMPLE USAGE OF THE API
    
    useEffect(async () => {

        await fetchUser();



    }, [])*/



    return (
        <>


            <Container fluid>
                <Row className='dashboard-card-row'>
                    <div className='card-green w-40'>
                        <p className='dash-heading'>SOCIETY DUES</p>
                        <span className='dash-heading'>₹ 1,70,22,920</span>
                    </div>
                    <div className='card-green w-40'>
                        <div className='center-left'>
                            <div className='icon-bg-white-round'>
                                <img className='dash-icon' src='../images/icon_premises.svg' />
                            </div>
                            <div className='float-left'>
                                <p className='dash-heading-sm'>No of Premises</p>
                                <p className='dash-heading'>80</p>
                            </div>
                        </div>
                    </div>
                    <div className='card-green w-40'>

                        <div className='center-left'>
                            <div className='icon-bg-white-round'>
                                <img className='dash-icon' src='../images/icon_residents.svg' />
                            </div>
                            <div className='float-left'>
                                <p className='dash-heading-sm'>No of Residents</p>
                                <p className='dash-heading'>8902</p>
                            </div>
                        </div>

                    </div>
                </Row>

                <Row className='dashboard-card-row'>
                    <div className='card-green-border w-40'>
                        <div className='card-green mx-4'>
                            <div className='icon-bg-white-round'>
                                <img className='dash-icon' src='../images/icon_latest_premises.svg' />
                            </div>
                            <p className='dash-heading-sm'>Latest Premises</p>
                        </div>
                        <div className='ml-8 last-space'>
                            <div className='dashboard-space-between'><p>Greenwood</p><p>A</p></div>
                            <div className='dashboard-space-between'><p>Greenwood</p><p>A</p></div>
                            <div className='dashboard-space-between'><p>Greenwood</p><p>A</p></div>
                            <div className='dashboard-space-between'><p>Greenwood</p><p>A</p></div>
                        </div>
                    </div>
                    <div className='card-green-border w-40'>
                        <div className='card-green mx-4'>
                            <div className='icon-bg-white-round'>
                                <img className='dash-icon' src='../images/icon_premises_due.svg' />
                            </div>
                            <p className='dash-heading-sm'>Latest Premises</p>
                        </div>
                        <div className='ml-8 last-space'>
                            <div className='dashboard-space-between'><p>Greenwood</p><p>A</p></div>
                            <div className='dashboard-space-between'><p>Greenwood</p><p>A</p></div>
                            <div className='dashboard-space-between'><p>Greenwood</p><p>A</p></div>
                            <div className='dashboard-space-between'><p>Greenwood</p><p>A</p></div>
                        </div>

                    </div>
                    <div className='card-green-empty'>
                        <Col>
                            <div className='card-green w-40 ml-12'>
                                <p className='dash-heading-sm btn-bg-white'>Recent Report</p>
                                <div className='ml-8 last-space' style={{ width: '100%' }}>
                                    <div className='dashboard-space-between-item' ><p>Greenwood</p><p>A</p></div>
                                    <div className='dashboard-space-between-item'><p>Greenwood</p><p>A</p></div>
                                </div>
                            </div>
                            <div className='card-green w-40 ml-12'>
                                <p className='dash-heading-sm btn-bg-white'>Recent Coupon</p>
                                <div className='ml-8 last-space' style={{ width: '100%' }}>
                                    <div className='dashboard-space-between-item' ><p>Greenwood</p><p>A</p></div>
                                    <div className='dashboard-space-between-item'><p>Greenwood</p><p>A</p></div>
                                </div>
                            </div>
                        </Col>
                    </div>

                </Row>

            </Container>



        </>
    )
}

export default AdminDashboard

