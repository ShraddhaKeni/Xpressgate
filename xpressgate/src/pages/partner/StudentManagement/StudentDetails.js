import React, { useEffect, useState } from 'react'
import {useLocation, Navigate} from 'react-router-dom';
import PaginationCalculate from "../../../components/GuardModule/Utils/paginationCalculate";
import { SimpleDropDownComponent, SimpleInputComponent } from '../../admin/components/input';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import RouterPath from '../../../common/constants/path/routerPath';

function StudentDetails() {
  const location = useLocation();

 


  const [student, setStudent] = useState({});
  const [allprograms, setAllPrograms] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {

    getProgram();
   

}, [])
async function getProgram() {
  

  const res = await axios.get(`${window.env_var}api/partner/students/${location.state.student}`)

setStudent(res.data.data)

}

  return (
    <>
     
    
      <div>
    
        <div className="page-label">
          <label>Member Details</label>
        </div>

        <div className="col-sm-12 col-md-12 col-lg-12">
          <div className="SdetailsCard">
            <br></br>
            <div className="ImageCont">
              <div className="Studentprofileimage">
                <img src="/images/StudentProfileIcon.svg " alt="profile" />
              </div>
              <br></br>
              <label className="StudentNameLAbel">{student.name || "n/a"}</label>
              
              <br />

              <br></br>
              <br></br>
              <br></br>
            </div>
            <div className="StudentdetailsContainer">
              <div>
              <Form className='FCPartner' >
              <div class="form-group row">
              <label class="col-lg-4 col-form-label SD_LAbels">Mobile No</label>
              <div class="col-lg-7">
                <div required type="number" class="form-control input-lg PartnerSideBorder" id='mobile_no' ><label>{student.phone || "n/a"}</label></div>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-4 col-form-label SD_LAbels">Email Id</label>
              <div class="col-lg-7">
                <div  class="form-control input-lg PartnerSideBorder" id='email'><label>{student.email || "n/a"}</label></div>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-4 col-form-label SD_LAbels">Enrolled course</label>
              <div class="col-lg-7">
                <div  class="form-control input-lg PartnerSideBorder" id='Enrolled_course' ><label>{student.program || "n/a"}</label></div>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-4 col-form-label SD_LAbels">Course Type</label>
              <div class="col-lg-7">
                <div  class="form-control input-lg PartnerSideBorder" id='Course_Type' ><label>{student.program_type == '1' ? 'Online' : 'Offline' || "n/a"}</label></div>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-4 col-form-label SD_LAbels">Occupation</label>
              <div class="col-lg-7">
                <div   class="form-control input-lg PartnerSideBorder" id='Occupation' ><label>{student.occupation || "n/a"}</label></div>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-4 col-form-label SD_LAbels">Address</label>
              <div class="col-lg-7">
                <div  class="form-control input-lg PartnerAddressSideBorder" id='Address'><label>{student.address || "n/a"}</label></div>
              </div>
            </div>
        
                </Form>
              </div>
              <br/>
              
            </div>
          </div>
    
        </div>
      </div>

    </>
  );
}

export default StudentDetails;
