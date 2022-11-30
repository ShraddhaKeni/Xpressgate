import React,{useState,useEffect,useRef} from "react";
import "../SocietyModule/SocietyDues.css";
import LogOut from "../SocietyModule/Utils/LogOut";
import { getBlocks } from "./common/common";
import axios from "axios";
import Societyheader from "./Utils/Societyheader";

const SocietyDues = () => {
   
  const [block,setBlock] = useState([])
  const [flats,setFlats] = useState([])
  const [resident,setResident] =useState({})

  const payment_due = useRef([])
  const payment_date = useRef([])
  const amount = useRef([])
  const flat_id = useRef([])
  const payment = useRef([])


  useEffect(()=>{
    getData()

  },[])

  const getData=async()=>{
    try {
      setBlock(await getBlocks())
    } catch (error) {
      console.log(error)
    }
  }
  
  const getFlats=async(e)=>{
    try {
      const {data} = await axios.get(`${window.env_var}api/flats/getList/${e.target.value}`)
      setFlats(data.data.list)
    } catch (error) {
      console.log(error)
    }
  }
  const getResident=async(e)=>{
    try {
      const {data} = await axios.get(`${window.env_var}api/flats/single/${e.target.value}`)
      setResident(data.data.list[0])
    } catch (error) {
      
    }
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
      const sendData={
        payment_type:payment.current.value=='1'?1:2,
        resident_id:resident.resident_id,
        flat_id:flat_id.current.value,
        paymentDue:payment_date.current.value,
        dueDate:payment_due.current.value,
        paymentAmount:amount.current.value,
      }

      const {data} = await axios.post(`${window.env_var}api/maintenancepayment/addBill`,sendData)
      console.log(data)
    } catch (error) {
      console.log(error)
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
        <br/>
        
        <div className="addguard_sideimg">
          <img src="/images/communitysideimg.svg" alt="dashboard sideimage" />
        </div>
      </div>
      <div className="addguestbackgroundimg">
        <div className="Addguestdisplay4">
          <label>Society Dues</label>
        </div>
        <div className="Payment_form">
            <div className="inboxes">
                <label for="Type" className="Typedetails">Type</label>
                <select  id="Type" ref={payment} className="vendorinput">
                    <option value={null}>Select Type</option>
                    <option value="1">Maintenance</option>
                    <option value="2">Rent</option>
                </select> 
            </div>
        </div>
        <div className="Payment_form">
            <div className="inboxes">
                <label for="Blockk " className="Society_Block ">Block </label>
                <select  id="Blockkk"  onChange={(e)=>getFlats(e)}  className="vendorinput">
                <option value="" selected disabled>Select Block</option>
                      {block.map(item=>{
                        return <option value={item.id}>{item.name}</option>
                      })}
                    </select> 
            </div>
        </div>
        <div className="Payment_form">
            <div className="inboxes">
                <label for="SocietyFlatNum" className="SocietyFlatNo">Flat No</label>
                <select  id="UtilityFlatNo" ref={flat_id} onChange={(e)=>{getResident(e)}} className="vendorinput">
                <option value="" selected disabled>Select Flat</option>
                      {flats.map(item=>{
                        return <option value={item._id}>{item.flat_number}</option>
                      })}
                    </select>
            </div>
        </div>
        <div className="Payment_form">
            <div className="inboxes">
                <label for="SocietyResidentname" className="Society_Residentnames">Resident Name</label>
                
                {resident.firstname?<input type="text"  id="UtilityResidentname" className="vendorinput" disabled name="First name" placeholder="Resident name" value={resident.firstname+' '+resident.lastname}/>:
                <input type="text"  id="UtilityResidentname" className="vendorinput" disabled name="First name" placeholder="Resident name" />}
            </div>
        </div>
        <div className="Payment_form">
            <div className="inboxes">
                <label for="SocietyAmount" className="Society_Amount">Amount</label>
                <input type="text" ref={amount}  id="SocietyAmount"  className="vendorinput"></input> 
            </div>
        </div>
        <div className="Payment_form">
            <div className="inboxes">
                <span>
                <label for="Paydate" class="paymentdate">Payment Date</label>
                <input type="date" ref={payment_date} id="Paydate" className="Paymentdateinput"></input>
                </span>
                <span>
                <label for="Duedate" class="Duedate">Due Date</label>
                <input type="date" ref={payment_due} id="Duedate" className="Duedateinput"></input>
                </span>
            </div>
        </div>
        <div className="ButtonsContainer2">
            <div className="button1">
                <button type="button" onClick={(e)=>{handleSubmit(e)}} className="AddButnn">Add</button>
            </div>
        </div>
      </div>
    </div>
       
       
    
  );
};

export default SocietyDues;
