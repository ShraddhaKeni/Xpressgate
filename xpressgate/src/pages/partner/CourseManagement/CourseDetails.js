import React from 'react'

function CourseDetails() {
  return (
    <>
      <div>
        <div className="page-label">
          <label>Course Details</label>
        </div>
        <div className="col">
          <div className="PCard">
            <br></br>
            <label className="namelabel">Category</label>
            <div className='profclass'>
            <label>Course Details</label>
             </div>
            <br></br>
          
            <div><label className='DescLabels'>Description</label></div>
            <div className='descriptionclass'>
            <div><label></label></div>
                <div></div>
                
            </div>
            <br/>
            <div className='ContentBox'>
                <div className='CTLAbel'>
                <label>Course Type</label>
                <div className='typeboxes'>
                <label> </label>
                </div> 
                </div>
                <div className='CLLAbel'>
                <label>Course Fees</label>
                <div className='typeboxes'>
                    <label> </label>
                </div> 
                </div>
                <div></div>
            </div>
            <br></br>
            <div><label className='ESLabel'>Enrolled Student</label></div>
            <div className='ESDescClass'>
              <button className="ViewListBtn">View List</button>
            </div>
            <div className='MaxSLabel'>
              <label>Maximum 20 Students</label>
            </div>
            <button type="submit" id='Edit'  className="EditCDButn">Edit Course </button>
            <button type="remove" id='Delete'  className="DeleteCDButn">Delete Course</button>
             <br/>
             <br/>
         
           
            <br></br>
          </div>
        </div>
        </div>
  
    </>
  );
}

export default CourseDetails;
