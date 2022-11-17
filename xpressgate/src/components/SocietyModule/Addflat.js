import React, { useEffect, useState } from 'react';
import './Addflat.css';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import LogOut from './Utils/LogOut';
import axios from 'axios';
import Societyheader from './Utils/Societyheader';

const Addflat = () => {
  const [community,setCommunity] = useState([])
  const [block,setBlock] = useState([])
  
  useEffect(()=>{
    getDetails()
  },[block])

  const getDetails = async()=>{
    try {
        const {data} = await axios.get(`${process.env.REACT_APP_SERVER_PATH}api/community/get`)
        setCommunity(data.data.community)
    } catch (error) {
      console.log(error)
    }
  }

  const getBlocks=async(e)=>{
    try {
      const param = {
        community_id:e.target.value
      }
      const {data} = await axios.post(`${process.env.REACT_APP_SERVER_PATH}api/block/get`,{
        community_id:e.target.value
      })
      setBlock(data.data.block)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
      const sendData = {
        community_id:document.getElementById('community_select').value,
        block:document.getElementById('block_select').value,
        number:document.getElementById('flat_no').value,
        description:document.getElementById('description').value,
        status:document.getElementById('status').value
      }
      const {data} = await axios.post(`${process.env.REACT_APP_SERVER_PATH}api/flat/add`,sendData)
      window.location.href='/blockList'
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="addflatcontainer">
      <div id="addflatsection">
        <Societyheader/>
      </div>
      <div id="afsocietysection">
        <div className='afsocietyname'>
          <img src="/images/societyicon.svg" alt="society name" />
          <label>Society Name</label>
        </div>
        <div className='afsideimage'><img src="/images/societysideimg.svg" alt="society sideimage" /></div>
      </div>
      <div className='afbackgroundimg'>
        <div className='Addflatdisplay'>
          <label>Add Flat</label>
        </div>
        <Form className='formclass'>
          <div class="form-group row">
            <label for="inputentryno" class="col-sm-2 col-md-2 col-lg-2 col-form-label labelsize">Community</label>
            <div class="col-sm-4 col-md-4 col-lg-4">
              <select class="form-control input-lg" id='community_select' onChange={(e)=>{getBlocks(e)}}>
                <option value={null} disabled selected>Select Community</option>
                {community.map(item=>{
                  
                  return (
                    <option value={item.id}>{item.name}, {item.location}</option>
                  )
                })}
              </select>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-2 col-form-label labelsize">Block</label>
            <div class="col-lg-4">
              <select class="form-control input-lg" id="block_select" placeholder="Block">
              <option value={null} disabled selected>Select Block</option>
              {block.map(item=>{
                  return (
                    <option value={item.id}>{item.name}</option>
                  )
                })}
              </select>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-2 col-form-label labelsize">Flat No</label>
            <div class="col-lg-4">
              <input type="text" class="form-control input-lg" id='flat_no' name="flatNo" placeholder="Flat No"></input>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-2 col-form-label labelsize">Description</label>
            <div class="col-lg-4">
              <textarea  type="text" id='description' class="form-control input-lg" name="description" placeholder="Description"></textarea>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-2 col-form-label labelsize">Status</label>
            <div class="col-lg-4">
              <select class="form-control input-lg" id="status" placeholder="Status">
                <option value={null} disabled selected>Select Status</option>
                <option value={1}>Occupied</option>
                <option value={0}>Empty</option>
              </select>

            </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-2 col-form-label labelsize">Images</label>
            <div class="col-lg-4">
              <input type='file' class="form-control input-lg" name="inputnoofpeople" placeholder="Images"></input>
            </div>
          </div>
          <Button type="submit" onClick={(e)=>{handleSubmit(e)}} className="btnAdd">Add Flat</Button>
        </Form>

      </div>
    </div>
  )
}

export default Addflat

