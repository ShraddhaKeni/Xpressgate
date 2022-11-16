import React from "react";
import "../Screens/Addmanagementteam.css";
import LogOut7 from "../Screens/LogOut7";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
const Addmanagementteam = () => {
  return (
    <div className="addguestcontainer1">
      <div id="headersection1">
        <div className="firstheadersection1">
          <div id="dashboardlogo1">
            <img src="/images/loginlogo.svg" alt="header logo" />
          </div>
          <div id="dashboardguard1">
            <label>Society</label>
          </div>
          <div id="dashboardspace"></div>
          <div id="dashboardnotification1">
            <a href="abc">
              <img src="/images/notification.svg" alt="notificationicon" />
            </a>
          </div>
          <div id="dashboardsetting1">
            <a href="abc">
              <img src="/images/setting.svg" alt="settingicon" />
            </a>
          </div>
          <div id="dashboardlogoutbutton">
            <LogOut7 />
          </div>
        </div>
      </div>
      <div id="societynamesection">
        <div className="societyname">
          <img src="/images/profileicon.svg" alt="Society image" />
          <label>Society Name</label>
        </div>

        <div className="sideimage6">
          <img src="/images/communitysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">
        <div className="Addguestdisplay3">
          <label>Add Management Team</label>
        </div>
        <Form className="formclass">
          <div class="form-group5 row">
            <label class="col-lg-2 col-form-label labelsize">Resident</label>
            <div class="col-lg-4">
              <input
                type="text"
                class="form-control input-lg"
                name="Resident"
                placeholder=""
              ></input>
            </div>
          </div>
          <div class="form-group5 row">
            <label class="col-lg-2 col-form-label labelsize">
              {" "}
              Designation
            </label>
            <div class="col-lg-4">
              <input
                type="text"
                class="form-control input-lg"
                name="Designation"
                placeholder=""
              ></input>
            </div>
          </div>
          <div className="date row g-2">
            <div class="col-md-3">
              <label for="inputEmail4" class="form-label dateto">
                To
              </label>
              <input
                type="date"
                class="form-control"
                id="inputEmail4"
                name="to"
              />
            </div>
            <div class="col-md-3">
              <label for="inputPassword4" class="form-label dateto">
                From
              </label>
              <input
                type="date"
                class="form-control"
                id="inputPassword4"
                name="From"
              />
            </div>
          </div>

          <Button type="submit" className="btnAdd4">
            Add
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Addmanagementteam;
