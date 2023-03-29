import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { getAllPrograms } from '../../../common/partner/partner_api';
import RouterPath from '../../../common/constants/path/routerPath';
import { Loader } from '../../../components/Loader';
import PaginationCalculate from '../../../components/GuardModule/Utils/paginationCalculate';
let PageSize = 6;
function CourseManagement() {
  const navigate = useNavigate();

  const [programs, setPrograms] = useState();
  const [allprograms, setAllPrograms] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);



    useEffect(() => {
      async function getPrograms() {
        const res = await getAllPrograms();
        console.log(res)
        if (res && res.data.status_code == 200) {
          setAllPrograms(res.data.data);
            getCurrentPrograms(res.data.data)
  
        }
        setLoading(false)
    }

        getPrograms();
    }, [])
    

    function getCurrentPrograms(data) {
        const lastPageIndex = (currentPage) * PageSize
        const firstPageIndex = lastPageIndex - PageSize;
        console.log(lastPageIndex, firstPageIndex);
console.log(data)
        if (data.length < PageSize) {
          setPrograms(data?.slice(firstPageIndex, lastPageIndex));
            return data;
        }

        setPrograms(data?.slice(firstPageIndex, lastPageIndex));
    }


    const handlePageChange = (page) => {

        setCurrentPage(page.selected + 1);
        const lastPageIndex = (page.selected + 1) * PageSize
        const firstPageIndex = lastPageIndex - PageSize;
        console.log(lastPageIndex, firstPageIndex);
        setPrograms(allprograms?.slice(firstPageIndex, lastPageIndex));

    }

    function findText(e) {
        let search = e.target.value.toLowerCase()
        let arr = allprograms.filter(x => {
            if (x?.name?.toLowerCase()?.includes(search)) {
                return true
            }

        })

        if (arr.length > 0) {
          getCurrentPrograms(arr);
        }
        else {
          getCurrentPrograms(allprograms);
        }

    }

    const handleEditClick = (id) => {
      navigate('/partner/course/editcourse', { state: { id } })
      
    }







  return (
    <>
     <Loader loading={loading}>
      <div>
        <div className="page-label">
          <label>Program List</label>
        </div>
        <div>
          <div className="table-top-right-content">
            <div className="table-srch pl-2">
              <span>
                <img src="/images/vendorlistsearch.svg" alt="search icon"></img>
              </span>
              <span>
                <input className="search" placeholder="Search" onChange={(e) => { findText(e) }}  />
              </span>
            </div>
            <div className="table-add-new-butn" onClick={() => { window.location.href = '/partner/course/addcourse' }} >
              <span className="ml-2">&#43; Add New Program</span>
            </div>
          </div>
          <div id="cardsection">
                            <div className="row row-cols-1 row-cols-md-3 g-3 mb-5 allcards">

                            {programs && programs.map((program) => {

return <div className="col  card_hover_animation" key={program.id}>
    <div className="Coupon-card-green ">
    <img src="/images/pencilicon.png" className="pencilicon" onClick={() => { handleEditClick(program.id) }}></img>
        {/* <div className='d-flex justify-content-end mr-5'><button className={`${coupon.status == 1 ? 'highlight-active' : 'highlight-inactive'} p-2 px-3`}><span className={`${coupon.status == 1 ? 'dot' : 'dot-inactive'}`}></span>{coupon.status == 1 ? 'Active' : 'Inactive'}</button></div> */}
        <div>
            <p className='dash-Coupon_heading-sm'>{program.name || "n/a"}</p>
            <p className='Coupon_heading'>{program.category || "n/a"}</p>
            <p className='dash-Coupon_heading-md'>{program.type || "n/a"}</p>
            <Link to={`${RouterPath.COURSE_DETAILS}`} state={{ program }} type="button" className="btn btn-primary blue-bg">View</Link>
        </div>
    </div>

</div>


})}
                                        {/* <div className="col card_hover_animation">
                                            <div className="Coupon-card-green ">
                                            <a href="/partner/course/editcourse"><img src="/images/pencilicon.png" className="pencilicon"></img></a>
                                                <div>
                                                    <p className='dash-Coupon_heading-sm'>Program Name</p>
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
                                                    <p className='dash-Coupon_heading-sm'>Program Name</p>
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
                                                    <p className='dash-Coupon_heading-sm'>Program Name</p>
                                                    <p className='Coupon-heading'>Fashion Designing</p>
                                                    <p className='dash-Coupon_heading-md'><b>Live - Online Classes</b></p>
                                                    <Link to={`${RouterPath.COURSE_DETAILS}`} type="button" className="btn btn-primary blue-bg">View</Link>
                                                </div>
                                            </div>

                                        </div> */}

                            </div>                
                            {allprograms?.length &&
                                <div className="paginate" style={{ marginTop: '3%' }}>
                                    <PaginationCalculate totalPages={allprograms.length} postperPage={PageSize} currentPage={currentPage} paginate={handlePageChange} />
                                </div>
                            }      



                          
                        </div>
        </div>
      </div>
      </Loader>
    </>
  );
}

export default CourseManagement;
