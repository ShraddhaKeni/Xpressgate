import React from 'react'

function CourseDetails() {
  return (
    <>
      <div>
        <div className="page-label">
          <label>Program Details</label>
        </div>
        <div className="col">
          <div className="PCard">
            <br></br>
            <label className="namelabel">Category</label>
            <div className='profclass'>
            <label>Program Details</label>
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
                <label>Program Type</label>
                <div className='typeboxes'>
                <label> </label>
                </div> 
                </div>
                <div className='CLLAbel'>
                <label>Program Fees</label>
                <div className='typeboxes'>
                    <label> </label>
                </div> 
                </div>
                <div></div>
            </div>
            <br></br>
            <div><label className='ESLabel'>Enrolled Member</label></div>
            <div className='ESDescClass'>
              <button className="ViewListBtn">View List</button>
            </div>
            <div className='MaxSLabel'>
              <label>Maximum 20 Members</label>
            </div>
            <button type="submit" id='Edit'  className="EditCDButn">Edit Program </button>
            <button type="remove" id='Delete'  className="DeleteCDButn">Delete Program</button>
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
