import React, { useEffect, useState } from 'react'
import { getAllPrograms, getProgramById, updateProgram } from '../../common/partner/partner_api';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { goBackInOneSec, MESSAGES, TOAST } from '../../common/utils';
import { ToastMessage } from '../../components/ToastMessage';
import RouterPath from '../../common/constants/path/routerPath';
import axios from "axios";
import Societyheader from './Utils/Societyheader';

const ProgramDetails = () => {
   
    const location = useLocation();

  const navigate = useNavigate()
  const [toast, setToast] = useState({ show: false })

  const  [program, setProgram] = useState(location?.state?.program);
  const [allprograms, setAllPrograms] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {

   

  
  
}, [])



  return (
<>
    <div className="addguestcontainer4">
      <div id="addflatsection">
        <Societyheader/>
      </div>
      <div id="societynamesection">
        <div className="VP_societyname">
          <img src="/images/societyicon.svg" alt="Society image" />
          <label>Society Name</label>
        </div>
      
        <div className="ParticipantsideImg">
          <img src="/images/societysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">
        
      <ToastMessage show={toast.show} message={toast.message} type={toast.type} handleClose={() => { setToast({ show: false }) }} />
   {!program }
     {program &&
   
       <div>
       <div className="page-label">
         <label>Program Details</label>
       </div>
    <div>
        <div className="col">
          <div className="PCard">
            <br></br>
            <label className="namelabel">Category</label>
            <div className='profclass'>
            <label>{program.category == '1' ? "Fashion" : program.category == '2' ? "Dance" : program.category == '3' ? "sports" : 'Classes' || 'n/a' }</label>
             </div>
            <br></br>
          
            <div><label className='DescLabels'>Description</label></div>
            <div className='descriptionclass'>
            <div><label>{program.details || "n/a"}</label></div>
                <div></div>
                
            </div>
            <br/>
            <div className='ContentBox'>
                <div className='CTLAbel'>
                <label>Program Type</label>
                <div className='typeboxes'>
                <label>{program.type == '1' ? 'Online' :'Offline' || "n/a"}</label>
                </div> 
                </div>
                <div className='CLLAbel'>
                <label>Program Fees</label>
                <div className='typeboxes'>
                    <label>{program.fee || "n/a"}</label>
                </div> 
                </div>
                <div></div>
            </div>
            <br></br>
            <div><label className='ESLabel'>Enrolled Member</label></div>
            <div className='ESDescClass'>
            <label>{program.max_members || "n/a"} </label>
              <button className="ViewListBtn"  onClick={() => { window.location.href = '/partner/student' }} >View List</button>
            </div>
            <div className='MaxSLabel'>
              <label>Maximum 20 Members</label>
            </div>
            {/* <button type="submit" id='Edit'  className="EditCDButn"  onClick={() => { handleEditClick(program.id) }}>Edit Program </button>
            <button type="remove" id='Delete'  className="DeleteCDButn"  onClick={() => handleDelete()}>Delete Program</button> */}
             <br/>
             <br/>
      </div>
      
    </div> 
    </div> 
    </div> 
}
    </div> 
    </div> 
</>
     
       
    
 

  );

}
export default ProgramDetails;
