import React, { useEffect,useState } from "react";
import "./Addguard.css";
import LogOut from './Utils/LogOut'
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import axios from "axios";
import { useLocation } from "react-router-dom";
import {checkSociety} from '../auth/Auth'

const Addguard = () => {
  const [guard,setGuard] = useState({})
  const location = useLocation()
  const [type,setType] = useState('add')

  
  const handleSubmit = async(e)=>{
    e.preventDefault()

    try {

      if(type=='edit')
      {
        let formdata = new FormData()
        formdata.append('firstname',document.getElementById('firstname').value)
        formdata.append('lastname',document.getElementById('lastname').value)
        formdata.append('username',document.getElementById('username').value)
        formdata.append('mobileno',document.getElementById('phone').value)
        formdata.append('email',document.getElementById('email').value)
        formdata.append('guard_id',location.state.id)
        if(document.getElementById('profilePic').value)
        {
          formdata.append('profile_pic',document.getElementById('profilePic').files[0])
        }
        
        const {data} = await axios.post(`${window.env_var}api/guard/update`,formdata)
         
        window.location.href='/guardList'
      }
      else
      {
        let formdata = new FormData()
        formdata.append('firstname',document.getElementById('firstname').value)
        formdata.append('lastname',document.getElementById('lastname').value)
        formdata.append('username',document.getElementById('username').value)
        formdata.append('password',document.getElementById('password').value)
        formdata.append('mobileno',document.getElementById('phone').value)
        formdata.append('email',document.getElementById('email').value)
        formdata.append('profile_pic',document.getElementById('profilePic').files[0])
        const {data} = await axios.post(`${window.env_var}api/guard/add`,formdata)
        window.location.href='/guardList'
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{

    if(checkSociety())
    {
     const config = {
       headers:{
         'x-access-token':localStorage.getItem('accesstoken')
       }
     }
    axios.get(`${window.env_var}api/society/checkLogin`,config)
           .then(({data})=>{   
            if(location.state)
            {
              getGuardDetails()
              setType(location.state.type)
            }
            else
            {
              window.history.back(-1)
            }
           })
           .catch(err=>{
             localStorage.clear();
             window.location.href='/societylogin'
           }) 
    }
    else
    {
     window.location.href='/'
    }


   
  },[])

  const getGuardDetails=async()=>{
    try {
      const {data} = await axios.get(`${window.env_var}api/guard/getone/${location.state.id}`)
      setGuard(data.data)
    } catch (error) {
      
    }
  }

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
      <div className='Addflatdisplay'>
          <label>{type=='edit'?'Edit Guard':'Add Guard'}</label>
        </div>
        <Form className='formclass'>
         
         <div class="form-group form-group6 row">
           <label class="col-lg-2 col-form-label labelsize1">First name</label>
           <div class="col-lg-4">
            {type=='edit'?<input type="text" class="form-control input-lg" name="First name" id='firstname' placeholder="First Name" defaultValue={guard.firstname}/>:
            <input type="text" class="form-control input-lg input-lg1" name="First name" id='firstname' placeholder="First Name"/>}
           </div>
         </div>
         <div class="form-group form-group6 row">
           <label class="col-lg-2 col-form-label labelsize1">Last name</label>
           <div class="col-lg-4">
            {type=='edit'?<input type="text" class="form-control input-lg" name="Last name" id='lastname' defaultValue={guard.lastname} placeholder="Last name" />:
            <input type="text" class="form-control input-lg input-lg1" name="Last name" id='lastname' placeholder="Last name" />}
             
           </div>
         </div>
         <div class="form-group form-group6 row">
           <label class="col-lg-2 col-form-label labelsize1">Username</label>
           <div class="col-lg-4">
              {type=='edit'?<input type="text" class="form-control input-lg" name="Last name" id="username" defaultValue={guard.username} placeholder="Username" />
              :<input type="text" class="form-control input-lg input-lg1" name="Last name" id="username" placeholder="Username" />}
             
           </div>
         </div>
         {type!=='edit'?
          <div class="form-group form-group6 row">
          <label class="col-lg-2 col-form-label labelsize1">Password</label>
          <div class="col-lg-4">
            <input type="text" class="form-control input-lg input-lg1" name="Last name" id="password" placeholder="Password"></input>
          </div>
        </div>
        :''
          }
         <div class="form-group form-group6 row">
           <label class="col-lg-2 col-form-label labelsize1">Phone No</label>
           <div class="col-lg-4">
             {type=='edit'?<input type="text" class="form-control input-lg" name="Phone No" id="phone" defaultValue={guard.mobileno} placeholder="Phone No" />:
             <input type="text" class="form-control input-lg input-lg1" name="Phone No" id="phone" placeholder="Phone No" />}
           </div>
         </div>
         <div class="form-group form-group6 row">
           <label class="col-lg-2 col-form-label labelsize1">Email </label>
           <div class="col-lg-4">
             {type=='edit'?<input type="email" class="form-control input-lg" name="Email" id='email' defaultValue={guard.email} placeholder="Email" />:
             <input type="email" class="form-control input-lg input-lg1" name="Email" id='email' placeholder="Email" />}
           </div>
         </div>
         <div class="form-group form-group6 row">
           <label class="col-lg-2 col-form-label labelsize1">Add Profile Picture</label>
           <div class="col-lg-4">
             <input type="file" class="form-control input-lg input-lg1" name="Add Profile Picture" id="profilePic" placeholder=""></input>
           </div>
         </div>

         <Button type="submit" onClick={(e)=>handleSubmit(e)} className="btnAdd5">{type=='edit'?'Edit Guard':'Add Guard'}</Button>
         </Form>

      </div>
    </div>
       
       
    
  );
};

export default Addguard;
