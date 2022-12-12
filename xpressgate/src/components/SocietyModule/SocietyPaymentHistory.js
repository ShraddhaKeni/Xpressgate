import React, { useRef } from "react";
import "../SocietyModule/SocietyPaymentHistory.css";
import LogOut from "./Utils/LogOut";
import PaginationCalculate from "../GuardModule/Utils/paginationCalculate";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Societyheader from "./Utils/Societyheader";
import { getBlocks } from "./common/common";
import { Button } from "react-bootstrap";
const SocietyPaymentHistory = () => {
 
  const [utilities,setUtility]= useState([])
  const [block,setBlock] = useState([])
  const [currentPage, setCurrentpage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(12)
  const [currentPosts,setCurrentPosts] = useState([])
  const location = useLocation()
  const [bills,setBills] = useState([])

  const block_id = useRef([])
  const utility_id = useRef([])
  useEffect(()=>{
      getUtilities()
      getBills()
  },[])

  const getUtilities=async()=>{
    try {
        const {data} = await axios.get(`${window.env_var}api/admin/utilities/getAll`)
        setUtility(data.data.utilitieslist)
        setBlock(await getBlocks())
    } catch (error) {
      console.log(error)
    }

  }

  const getBills=async()=>{
    try {
      const {data} = await axios.get(`${window.env_var}api/admin/utilitypayment/getAll`)
      setBills(data.data.bills)
      const indexoflast = currentPage*postPerPage //endoffset
      const indexoffirst = (indexoflast - postPerPage) //startoffset
      setCurrentPosts(data.data.bills.slice(indexoffirst,indexoflast))
      document.getElementById("Blocks").selectedIndex = 0
      document.getElementById("bills").selectedIndex = 0
    } catch (error) {
      
    }
  }

  const getData = async()=>{
    try {
      const sendData= {
        utilityID:utility_id.current.value,
        block_id:block_id.current.value,
      }
      const {data} = await axios.post(`${window.env_var}api/admin/utilitypayment/getbyutilityandtype`,sendData)
      setBills(data.data.bills)
      const indexoflast = currentPage*postPerPage //endoffset
      const indexoffirst = (indexoflast - postPerPage) //startoffset
      setCurrentPosts(data.data.bills.slice(indexoffirst,indexoflast))
    } catch (error) {
      
    }
  }
  const  dateTimeFormat=(date)=>
  {
   
    var d = new Date(date)
    return d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate()
    
  }
    
  async function  paginate(event)
  {
    setCurrentpage(event.selected+1)
    const indexoflast = (event.selected+1)*postPerPage  //endoffset
    const indexoffirst = (indexoflast - postPerPage) //startoffset
    setCurrentPosts(bills.slice(indexoffirst,indexoflast))
  }

  function findText(e)
  {
    let search = e.target.value.toLowerCase()
    let arr = bills.filter(x=>{
      if(x.firstname.toLowerCase().includes(search))
      {
        return true
      }
      else if(x.lastname.toLowerCase().includes(search))
      {
        return true
      }
    })
    if(arr)
    {
      const indexoflast =currentPage*postPerPage  //endoffset
      const indexoffirst = (indexoflast - postPerPage)
      setCurrentPosts(arr.slice(indexoffirst,indexoflast))
    }
    else
    {
      paginate(0)
    }
  
}

  return (
    <div className="addguestcontainer4">
    <div id="addflatsection">
      <Societyheader/>
    </div>
      <div id="societynamesection">
        <div className="societyname">
          <img src="/images/profileicon.svg" alt="Society image" />
          <label>Society Name</label>
        </div>
        
        <div className="societysideimg1">
          <img src="/images/communitysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">
        <div className="paymentlabel">
          <label> Payment History</label>
        </div>
       <div className="dropboxes">
        <div>
          <select id="bills" onChange={()=>getData()} ref={utility_id} className="form-control input-lg ">
            <option value={null} disabled selected>Select Type</option>
            {utilities.map(item=>{
              
                return <option value={item._id}>{item.utilityType}</option>
            })}
          </select>
        </div>
        <div>
          <select id="Blocks" style={{ marginLeft:'20px'}} onChange={()=>getData()} ref={block_id} className="form-control input-lg">
            <option value={null} disabled selected>Select Block</option>
            {block.map(item=>{
                  return <option value={item.id}>{item.name}</option>
            })}
          </select>
        </div>
        <Button style={{backgroundColor:'#0A8996', marginLeft:'40px'}} onClick={()=>getBills()}>Get All</Button>
       </div>
        <input
          type=" search"
          className="paymentsearch"
          name="Search"
          placeholder="&#128269; Search"

          onChange={(e)=>findText(e)}
        ></input>

        <table
          id="inoutbooktable4"
          class="table table-striped table-bordered table-sm  "
          cellspacing="0"
          // style={{ border: '2px solid #14335D;;'}}
        >
          <thead>
            <tr>
              <th class="th-sm">Bill NO</th>
              <th class="th-sm">Flat No</th>
              <th class="th-sm">Resident Name</th>
              <th class="th-sm">Payment Date</th>
              <th class="th-sm">Due Date</th>
              <th class="th-sm">Amount</th>
              <th class="th-sm">Status</th>
              <th class="th-sm">Actions</th>
            </tr>
          </thead>
          <tbody>

            {bills?currentPosts.map((item,index)=>{

              return(
               
                <tr>
                  <td>{currentPage<=2?(currentPage-1)*12+(index+1):(currentPage-1+1)+(index+1)}</td>
                  <td>{item.flat}</td>
                  <td>{item.firstname} {item.lastname}</td>
                  <td>{dateTimeFormat(item.payment_date)} </td>
                  <td>{dateTimeFormat(item.due_date)} </td>
                  <td>Rs.{item.paymentAmount} </td>
                  <td>{item.paid==true?<h8 style={{color:'green'}}>Paid</h8>:<h8 style={{color:'red'}}>Unpaid</h8>}</td>
                  <td>{item.paid==true?'':<button className="send_reminder">Send Reminder</button>}</td>
              </tr>
              )
              
            }) : <tr>No Data Found</tr>}
            
          

            
          </tbody>
        </table>
        <PaginationCalculate totalPages={bills.length} postperPage={postPerPage} currentPage={currentPage} paginate={paginate}/>

      </div>
    </div>
  );
};

export default SocietyPaymentHistory;