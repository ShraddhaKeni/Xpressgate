import React from 'react';
import "../SocietyModule/Viewparking.css"
import LogOut from './Utils/LogOut'

import PaginationCalculate from "../GuardModule/Utils/paginationCalculate";



const Viewparking = () => {
 

  return (
    <div className="addguestcontainer4">
    <div id="addflatsection">
        <div className="addflatheadersection">
          <div id="aflogo"><img src="/images/loginlogo.svg" alt="header logo" /></div>
          <div id="afsociety"><label>Society</label></div>
          <div id="afspace"></div>
          <div id="afnotification"><a href="abc"><img src="/images/notification.svg" alt="notificationicon" /></a></div>
          <div id="afsetting"><a href="abc"><img src="/images/setting.svg" alt="settingicon" /></a></div>
          <div id="aflogoutbutton"><LogOut/></div>
        </div>
    
    </div>
      <div id="societynamesection">
        <div className="VP_societyname">
          <img src="/images/societyicon.svg" alt="Society image" />
          <label>Society Name</label>
        </div>
        <br/>
        <div className='vpsidelinks'>
          <label>Vehicle list</label><br></br>
          <a href='/viewparking' className='Vparksection'><b>View parking section</b></a><br/><br/>
          <a href='/addparking' className='Aparksection'>Add parking section</a>
        </div>
        <div className="viewparking_sideimg">
          <img src="/images/communitysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">
      <div className='VPdisplay'>
          <label>View Parking Section</label>
        </div>
        {/* <div className='row'>
          <div className='search3'>
            <span><img src="/images/vendorlistsearch.svg" alt='search icon' className="SearchIconImg"></img></span>
            <span><input className='GL_search_input' id="search_input" placeholder="Search" onKeyPress={(e) => {
                  document.getElementById('search_input').style.border = "none";
                }}></input></span>
          </div>
        </div> */}
        <div className='row'>
         <div className='VP_searchbox'>
            <span><img src="/images/vendorlistsearch.svg" alt='search icon'></img>
              <input placeholder='Search' id="search_input" onKeyPress={(e) => {
                  document.getElementById('search_input').style.border = "none"}}></input></span>
          </div>
        </div>
        <br/>
        <table id="viewparkingtable" class="table table-striped table-bordered table-sm " cellspacing="0" style={{ border: '2px solid black' }}>
          <thead>
            <tr>
              <th class="th-sm">Sr No.</th>
              <th class="th-sm">Parking Section</th>
              
              <th class="th-sm">Block</th>
              <th class="th-sm">Status</th>
            </tr>
          </thead>
          <tbody>
              {/* {currentPosts.map((item,index)=>{
               
                return(
                 
                  <tr onClick={()=>guardDetails(item.id)}>
                   <td>{currentPage<=2?(currentPage-1)*12+(index+1):(currentPage-1+1)+(index+1)}</td>
                    <td >{item.firstname} {item.lastname}</td>
                    <td>{item.mobileno}</td>
                    <td>{item.email}</td>
                    <td>{item.status==false?'Inactive':'Active'}</td>
                </tr>
                )
              })} */}
          </tbody>
        </table>
        <br/><br/>
        <PaginationCalculate totalPages={" "} postperPage={" "} currentPage={" "} paginate={" "}/>
    </div>
  </div>
         
        
     
       
  );
}

export default Viewparking;
