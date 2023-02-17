import React from "react";
import { ButtonUnstyled } from "@mui/base";
import PaginationCalculate from "../../../components/GuardModule/Utils/paginationCalculate";
import { SimpleDropDownComponent, SimpleInputComponent } from '../../admin/components/input';
import { Form } from 'react-bootstrap';

function StudentDetails() {
  return (
    <>
      <div>
        <div className="page-label">
          <label>Student Details</label>
        </div>

        <div className="col-sm-12 col-md-12 col-lg-12">
          <div className="SdetailsCard">
            <br></br>
            <div className="ImageCont">
              <div className="Studentprofileimage">
                <img src="/images/StudentProfileIcon.svg " alt="profile" />
              </div>
              <br></br>
              <label className="StudentNameLAbel"> Swati  Naik </label>
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
                <div required type="number" class="form-control input-lg PartnerSideBorder" id='mobile_no' ><label>9823982919</label></div>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-4 col-form-label SD_LAbels">Email Id</label>
              <div class="col-lg-7">
                <div  class="form-control input-lg PartnerSideBorder" id='email'><label>swatinaik@gmail.com</label></div>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-4 col-form-label SD_LAbels">Enrolled course</label>
              <div class="col-lg-7">
                <div  class="form-control input-lg PartnerSideBorder" id='Enrolled_course' ><label>Fashion Designing</label></div>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-4 col-form-label SD_LAbels">Course Type</label>
              <div class="col-lg-7">
                <div  class="form-control input-lg PartnerSideBorder" id='Course_Type' ><label>Online</label></div>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-4 col-form-label SD_LAbels">Occupation</label>
              <div class="col-lg-7">
                <div   class="form-control input-lg PartnerSideBorder" id='Occupation' ><label>Student</label></div>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-lg-4 col-form-label SD_LAbels">Address</label>
              <div class="col-lg-7">
                <div  class="form-control input-lg PartnerAddressSideBorder" id='Address'><label>Address</label></div>
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
