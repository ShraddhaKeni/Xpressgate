import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import RouterPath from '../../../common/constants/path/routerPath';

function CourseManagement() {
  return (
    <>
      <div>
        <div className="page-label">
          <label>Courses</label>
        </div>
        <div>
          <div className="table-top-right-content">
            <div className="table-srch pl-2">
              <span>
                <img src="/images/vendorlistsearch.svg" alt="search icon"></img>
              </span>
              <span>
                <input className="search" placeholder="Search" />
              </span>
            </div>
            <div className="table-add-new-butn" onClick={() => { window.location.href = '/partner/course/addcourse' }}>
              <span className="ml-2">&#43; Add New Course</span>
            </div>
          </div>
          <div id="cardsection">
                            <div className="row row-cols-1 row-cols-md-3 g-3 mb-5 allcards">

                         
                                        <div className="col card_hover_animation">
                                            <div className="Coupon-card-green ">
                                            <a href="/partner/course/editcourse"><img src="/images/pencilicon.png" className="pencilicon"></img></a>
                                                <div>
                                                    <p className='dash-Coupon_heading-sm'>Course Name</p>
                                                    <p className='Coupon-heading'>Fashion Designing</p>
                                                    <p className='dash-Coupon_heading-md'><b>Live - Online Classes</b></p>
                                                    <Link   type="button" className="btn btn-primary blue-bg">View</Link>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="col card_hover_animation">
                                            <div className="Coupon-card-green ">
                                            <a href="/partner/course/editcourse"><img src="/images/pencilicon.png" className="pencilicon"></img></a>
                                                <div>
                                                    <p className='dash-Coupon_heading-sm'>Course Name</p>
                                                    <p className='Coupon-heading'>Fashion Designing</p>
                                                    <p className='dash-Coupon_heading-md'><b>Live - Online Classes</b></p>
                                                    <Link   type="button" className="btn btn-primary blue-bg">View</Link>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="col card_hover_animation">
                                            <div className="Coupon-card-green ">
                                            <a href="/partner/course/editcourse"><img src="/images/pencilicon.png" className="pencilicon"></img></a>
                                                <div>
                                                    <p className='dash-Coupon_heading-sm'>Course Name</p>
                                                    <p className='Coupon-heading'>Fashion Designing</p>
                                                    <p className='dash-Coupon_heading-md'><b>Live - Online Classes</b></p>
                                                    <Link to={`${RouterPath.COURSE_DETAILS}`} type="button" className="btn btn-primary blue-bg">View</Link>
                                                </div>
                                            </div>

                                        </div>

                            </div>                
                                



                          
                        </div>
        </div>
      </div>
    </>
  );
}

export default CourseManagement;
