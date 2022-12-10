import '../GuardModule/Addinout.css';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import GuardHeader from './Utils/GuardHeader';
import axios from 'axios';
import React, { useEffect , useState } from 'react';
import { CompressOutlined } from '@mui/icons-material';
import { getBlocks } from '../SocietyModule/common/common';
import { checkGuard } from '../auth/Auth';

const Addinout = () => {
  const [details,setDetails] = useState({})
  const [block,setBlock] = useState([])
  const [visitor_type,setVisitorType] = useState([])
  const [flatno,setFlatNo] = useState([])

  useEffect(() => {
    if (checkGuard()) {
      const config = {
        headers: {
          'x-access-token': localStorage.getItem('accesstoken')
        }
      }
      axios.get(`${window.env_var}api/guard/checkLogin`, config)
        .then(({ data }) => {
          getBlocks()
        })
        .catch(err => {
          localStorage.clear();
          window.location.href = '/guardLogin'
        })
    } else {
      window.location.href = '/'
    }  
  
  }, [])
  const getBlock = async async =>{
    console.log("error",localStorage.getItem('community_id'))
    const Community_id={

      community_id:localStorage.getItem('community_id')
      
    }
    // try {
    //   const {data} = await axios.post(`${window.env_var}api/block/get`,Community_id)
    //   console.log("hi" + data)
    //   setBlock(data.data)
    // } catch (error) {
      
    // }
  }
  const getVisitorType = async(e)=>{
    try {
      const {data} = await axios.get(`${window.env_var}api/guard/visitertype ${e.target.value}`)
      setVisitorType(data.data)
    } catch (error) {
      
    }
  
  }
  const getFlatNo = async(e)=>{
    try {
      const {data} = await axios.get(`${window.env_var}api/flat/add ${e.target.value}`)
      setFlatNo(data.data)
    } catch (error) {
      
    }
  
  }
   const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
      const formData = new FormData()
      
      formData.append('name',document.getElementById('name').value)
      formData.append('visitor_type',document.getElementById('visitor_type').value)
      formData.append('block',document.getElementById('block').value)
      formData.append('flatno',document.getElementById('flatno').value)
      formData.append('contact_no',document.getElementById('contact_no').value)
      formData.append('date',document.getElementById('date').value)
      formData.append('intime',document.getElementById('intime').value)
      formData.append('status',document.getElementById('status').value)
      

      const {data} = await axios.post(`${window.env_var}api/guard/addinout`,formData)
      window.location.href='/inoutbook'
    } catch (error) {
      console.log(error)
    }
   } 

 






  return (
    <div className="aiocontainer">
      <div id="aiosection">
        <GuardHeader />
      </div>
      <div id="aiosocietysection">
        <div className='aiosocietyname'>
          <img src="/images/guardnameicon.svg" alt="guard name" />
          <label>Guard Name</label>
        </div>
        <div classNameName='aiosideimage'>
          <img src="/images/sideimage.svg" alt="guard sideimage" />
        </div>
      </div>
      <div classNameName='aiobackgroundimg'>
        <div className='aiodisplay'>
          <label>Add In Out</label>
        </div>
        <Form className='formclass'>
          <div className="form-group row">
            <label className="col-lg-2 col-form-label aiolabelsize">Name</label>
            <div className="col-lg-4">
              <input type="text" className="form-control input-lg" id='name' name="flatNo" placeholder="Name" value={details.name}></input>
            </div>
          </div>
          <div className="form-group row">
            <label for="inputentryno" className="col-sm-2 col-md-2 col-lg-2 col-form-label aiolabelsize">Visitor Type</label>
            <div className="col-sm-4 col-md-4 col-lg-4">
              <select className="form-control input-lg" id='visitor_type' onChange={(e)=>getVisitorType(e)}>
                <option value={null} disabled selected>Visitor Type</option>
                {visitor_type.map(item=>{
                  return (
                    <option value={item.id}>{item.name},{item.type}</option>
                  )
                })}
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label for="inputentryno" className="col-sm-2 col-md-2 col-lg-2 col-form-label aiolabelsize">Block</label>
            <div className="col-sm-4 col-md-4 col-lg-4">
              <select className="form-control input-lg" id='block' onChange={(e)=>getBlock(e)} >
                <option value={null} disabled selected>Block</option>
                {block.map(item=>{
                  return (
                    <option value={item.id}>{item.name}</option>
                  )
                })}

              </select>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-lg-2 col-form-label aiolabelsize">Flat No.</label>
            <div className="col-lg-4">
              <select className="form-control input-lg" id="flatno" placeholder="Flat No." onChange={(e)=>getFlatNo(e)}>
                <option value={null} disabled selected>Flat No.</option>
                {flatno.map(item=>{
                  return (
                    <option value={item.id}>{item.name}, {item.flatno}</option>
                  )
                })}
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-lg-2 col-form-label aiolabelsize">Contact No.</label>
            <div className="col-lg-4">
              <input type="number" className="form-control input-lg" id='contact_no' name="ContactNo" placeholder="Contact No." value={details.contact_no}></input>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-lg-2 col-form-label aiolabelsize">Date</label>
            <div className="col-lg-4">
              <input type="text" className="form-control input-lg" id='date' name="date" placeholder="Date" value={details.date}></input>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-lg-2 col-form-label aiolabelsize">In Time</label>
            <div className="col-lg-4">
              <input type="text" className="form-control input-lg" id='intime' name="intime" placeholder=" In Time" value={details.intime} ></input>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-lg-2 col-form-label aiolabelsize">Status</label>
            <div className="col-lg-4">
              <input type="text" className="form-control input-lg" id='status' name="status" placeholder="Status" value={details.status} ></input>
            </div>
          </div>

          <Button type="submit"  onClick={(e)=>{handleSubmit(e)}} className="btnAddInOut" on>Add In Out</Button>
        </Form>

      </div>
    </div>
  )
}

export default Addinout

