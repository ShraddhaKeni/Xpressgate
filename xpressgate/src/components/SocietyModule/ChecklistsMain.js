import React from "react";
import "../SocietyModule/Community.css";
import LogOut from './Utils/LogOut'
import Societyheader from "./Utils/Societyheader";


const ChecklistsMain = () => {
    return (
        <div className="addguestcontainer2">
            <div id="addflatsection">

                <Societyheader />


            </div>
            <div id="societynamesection">
                <div className="SC_societyname">
                    <img src="/images/societyicon.svg" alt="Society image" />
                    <label>Society Name</label>
                </div>
                <br />
                {/* <div class="noticelist">
          <h4><b>Notice List</b></h4>
          <a href="/addNotice" class="Notice">Add Notice</a>
        </div> */}
                {/* <div className='csidelinks'>
          <a className='CNsidelinks' href="/noticelist">Notice List</a><br></br><br></br>
          <a className='CANsidelinks' href="/addNotice">Add Notice</a>
        </div> */}
                <div className="SC_sideimage">
                    <img src="/images/societysideimg.svg" alt="dashboard sideimage" />
                </div>

            </div>
            <div className="addguestbackgroundimg">
                <div className="sdashdisplay">
                    <label>Checklists</label>
                </div>

                <div className="row row-cols-1 row-cols-md-3 g-4 sdfullcardscss allcards">

                    <div className="col card_hover_animation">
                        <div className="Cdashboardcard">
                            <a href="/security-checklist">
                                <img
                                    src="/images/security_checklist.svg"
                                    className="dbcard-img-top"
                                    alt="Security Checklist"
                                ></img>
                            </a>
                        </div>
                    </div>
                    <div className="col card_hover_animation">
                        <div className="Cdashboardcard">
                            <img
                                src="/images/s_staff_checklist.svg"
                                className="dbcard-img-top"
                                alt="Local Services"
                                onClick={() => {
                                    window.location.href = "/societystaffchecklist";
                                }}
                            ></img>
                        </div>
                    </div>
                    {/* <div className="col card_hover_animation">
                        <div className="Cdashboardcard">
                            <img
                                src="/images/maintenance_checklist.svg"
                                className="dbcard-img-top"
                                onClick={() => {
                                    window.location.href = "/maintenance-checklist";
                                }}
                                alt="Emergency"
                            ></img>
                        </div>
                    </div> */}

                </div>
            </div>
        </div>
    );
};

export default ChecklistsMain;
