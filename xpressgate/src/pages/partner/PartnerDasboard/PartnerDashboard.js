import React from 'react'

function PartnerDashboard() {
    return (
       <>
        <div>
        <div className='page-label'>
          <label>Dashboard</label>
        </div>
        <div id="cardsection">
       
              <div className="row row-cols-1 row-cols-md-3 g-4 sdfullcardscss">
          
                <div className="col card_hover_animation">
                  <div className="sddashboardcard">
                    <img src="/images/CourseManagement.svg" className="dbcard-img-top" alt="Course Management" onClick={() => { window.location.href = '/partner/course' }}></img>
                  </div>
                </div>
                <div className="col card_hover_animation">
                  <div className="sddashboardcard">
                    <img src="/images/StudentManagement.svg" className="dbcard-img-top" alt="Student Management" onClick={() => { window.location.href = '/partner/student' }}></img>
                  </div>
                </div>
                 </div>
                </div>
        </div>
       </>
    )
}

export default PartnerDashboard