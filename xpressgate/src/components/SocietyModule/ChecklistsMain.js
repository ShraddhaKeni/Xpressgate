import React from "react";
import "../SocietyModule/Community.css";
import LogOut from './Utils/LogOut'


const ChecklistsMain = () => {
    return (
        <div className="addguestcontainer2">
            <div id="addflatsection">
                <div className="addflatheadersection">
                    <div id="aflogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
                    <div id="afsociety"><label>Society</label></div>
                    <div id="afspace"></div>
                    <div id="afnotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
                    <div id="afsetting"><a href="/changesocpassword"><img src="/images/setting.svg" alt="settingicon" /></a></div>
                    <div id="aflogoutbutton"><LogOut /></div>
                </div>

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
                    <img src="/images/communitysideimg.svg" alt="dashboard sideimage" />
                </div>

            </div>
            <div className="addguestbackgroundimg">
                <div className="SC_display">
                    <label>Checklists</label>
                </div>

                <div className="row row-cols-1 row-cols-md-3 g-4 cfullcardscss allcards">

                    <div className="col card_hover_animation">
                        <div className="Cdashboardcard">
                            <a href="/security-checklist">
                                <img
                                    src="/images/guardmanagement.svg"
                                    className="dbcard-img-top"
                                    alt="Security Checklist"
                                ></img>
                            </a>
                        </div>
                    </div>
                    <div className="col card_hover_animation">
                        <div className="Cdashboardcard">
                            <img
                                src="/images/managecommunity.svg"
                                className="dbcard-img-top"
                                alt="Local Services"
                                onClick={() => {
                                    window.location.href = "/community-staff-checklist";
                                }}
                            ></img>
                        </div>
                    </div>
                    <div className="col card_hover_animation">
                        <div className="Cdashboardcard">
                            <img
                                src="/images/manageamenities.svg"
                                className="dbcard-img-top"
                                onClick={() => {
                                    window.location.href = "/maintenance-checklist";
                                }}
                                alt="Emergency"
                            ></img>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ChecklistsMain;
