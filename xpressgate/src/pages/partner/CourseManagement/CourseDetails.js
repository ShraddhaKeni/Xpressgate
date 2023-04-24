import React, { useEffect, useState } from 'react'
import { getAllPrograms, getProgramById, updateProgram } from '../../../common/partner/partner_api';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { goBackInOneSec, MESSAGES, TOAST } from '../../../common/utils';
import { ToastMessage } from '../../../components/ToastMessage';
import RouterPath from '../../../common/constants/path/routerPath';
import axios from "axios";
function CourseDetails() {
  const location = useLocation();

  const navigate = useNavigate()
  const [toast, setToast] = useState({ show: false })

  const  [program, setProgram] = useState(location?.state?.program);
  const [allprograms, setAllPrograms] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function getProgram() {
        const res = await getProgramById(location.state.program?.id);

    }

    getProgram();

}, [])
const handleEditClick = (id) => {
  navigate('/partner/course/editcourse', { state: { id } })
  
}

const handleDelete = async () => {
    const res = await axios.delete(`${window.env_var}api/partner/programs/${location.state.program._id}`)
    if (res && res.data?.status_code == 200) {
        setToast(TOAST.SUCCESS(res?.data?.message));
        goBackInOneSec(navigate)

    } else {
        setToast(TOAST.ERROR(res?.data?.message));
    }
}



  return (
    
     <>
     
     <ToastMessage show={toast.show} message={toast.message} type={toast.type} handleClose={() => { setToast({ show: false }) }} />
     {!program && <Navigate to={RouterPath.COURSE_DETAILS} />}
     {program &&
      <div>
        <div className="page-label">
          <label>Program Details</label>
        </div>
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
                <label>{program.type == '1' ? 'Online' :'Offline' || "n/a"} </label>
                </div> 
                </div>
                <div className='CLLAbel'>
                <label>Program Fees</label>
                <div className='typeboxes'>
                    <label>{program.fee || "n/a"} </label>
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
            <button type="submit" id='Edit'  className="EditCDButn"  onClick={() => { handleEditClick(program._id) }}>Edit Program </button>
            <button type="remove" id='Delete'  className="DeleteCDButn"  onClick={() => handleDelete()}>Delete Program</button>
             <br/>
             <br/>
         
           
            <br></br>
          </div>
        </div>
        </div>
       
    }
    </>
  );
}

export default CourseDetails;
