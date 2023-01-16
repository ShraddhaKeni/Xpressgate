import React from "react";
import "../SocietyModule/Community.css";
import LogOut from './Utils/LogOut'
import { ButtonBase, Icon, IconButton } from '@mui/material';
import PaginationCalculate from "../GuardModule/Utils/paginationCalculate";
const UtilityPyamentLinkList = () => {
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
      
        <div className="SC_sideimage">
          <img src="/images/communitysideimg.svg" alt="dashboard sideimage" />
        </div>

      </div>
      <div className="addguestbackgroundimg">
        <div className="SC_display">
          <label>Utility Payment Link List</label>
        </div>
        <div> <button type="submit" className="btnAddnotice"  onClick={() => {
                window.location.href = "/utilitypaymentlink";
              }}>&#10011; Add New Link</button></div>
      
        <div className='row'>
          <div className='nlsearchbox'>
            <span><img src="/images/vendorlistsearch.svg" alt='search icon'></img>
              <input className='vlsearch_input' placeholder='Search'></input></span>
          </div>
        </div>
        <br/>
        <table id="Table-Header" class="table table-striped table-bordered table-sm " cellspacing="0">
                        <thead className='table-th'>
                            <tr>
                                <th class="th-sm" >Sr No.</th>
                                <th class="th-sm">Payment Type</th>
                                <th class="th-sm">Links</th>
                                <th class="th-sm">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            {/* {currentPosts.map((item, index) => {
                                return (
                                    <tr>
                                        <td>{index + 1 + (currentPage * postPerPage)}</td>
                                        <td>{item.name}</td>
                                        <td>{item.noofblocks}</td>
                                        <td><ButtonUnstyled className='approve-active'>{item.status == true ? 'Unapprove' : 'Approve'}</ButtonUnstyled></td>
                                        <td>
                                            <div>
                                                <IconButton onClick={() => { handleEditClick(item.id) }}>
                                                    <img src="/images/icon_edit.svg" />
                                                </IconButton>

                                                {item.status === true ? <IconButton onClick={() => removePremise(item._id)}>
                                                    <img src="/images/icon_delete.svg" />
                                                </IconButton> : ''}

                                            </div>
                                        </td>
                                    </tr>
                                )
                            })} */}


                        </tbody>
                    </table>

      </div>
    </div>
                   
       
    
     
  );
};

export default UtilityPyamentLinkList;
