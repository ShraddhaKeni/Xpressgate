import React, { useEffect, useState } from 'react';
import './Addflat.css';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import LogOut from './Utils/LogOut';
import axios from 'axios';
import Societyheader from './Utils/Societyheader';
import { checkSociety } from '../auth/Auth';

const Addflat = () => {
  const [community, setCommunity] = useState([])
  const [block, setBlock] = useState([])
  const [community_id, setCommunityid] = useState([])

  useEffect(() => {
    let community_id= localStorage.getItem('community_id')
    setCommunityid(community_id)

    if (checkSociety()) {
      const config = {
        headers: {
          'x-access-token': localStorage.getItem('accesstoken')
        }
      }
      axios.get(`${window.env_var}api/society/checkLogin`, config)
        .then(async({ data }) => {
          await getDetails()
          await getBlocks()
          //  let comm_select = document.getElementById('community_select').options
          //  let options = Array.from(comm_select)
          //  console.log(options)
          // let select = options.find(x=>x.value===localStorage.getItem('community_id'))
          // select.selected= true
        })
        .catch(err => {
          localStorage.clear();
          window.location.href = '/societylogin'
        })
    }
    else {
      window.location.href = '/'
    }

  }, [])

  const getDetails = async () => {
    try {
      const { data } = await axios.get(`${window.env_var}api/community/get`)
      setCommunity(data.data.community)
      //console.log(data.data.community.filter(x=>x.name))
      //setCommunityid(data.data.community[0].name)
    } catch (error) {
      console.log(error)
    }
  }

  const getBlocks = async (e) => {
    try {
      // const param = {
      //   community_id: e.target.value
      // }
      const { data } = await axios.post(`${window.env_var}api/block/get`, {
        community_id: localStorage.getItem('community_id')
      })
      console.log(data)
      setBlock(data.data.block)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const sendData = {
        community_id: localStorage.getItem('community_id'),
        block: document.getElementById('block_select').value,
        number: document.getElementById('flat_no').value,
        description: document.getElementById('description').value,
        status: document.getElementById('status').value
      }
      const { data } = await axios.post(`${window.env_var}api/flat/add`, sendData)
      window.location.href = '/blockList'
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="addflatcontainer">
      <div id="addflatsection">
        <Societyheader />
      </div>
      <div id="afsocietysection">
        <div className='afsocietyname'>
          <img src="/images/societyicon.svg" alt="society name" />
          <label>Society Name</label>
        </div>
        <div className='nlsidelinks'>
          <a className='AfListsidelink' href="/blockList">Block List</a><br></br><br />
          <a className='AflockSidelink' href="/addblock">Add Block</a><br /><br />
          {/* <a className='ALFlatsidelinks' href="/flatList">Flat List</a><br></br><br></br> */}
          <a className='ALAddsidelinks' href="/addflat"><b>Add Flat</b></a>
        </div>
        <div className='afsideimage'><img src="/images/societysideimg.svg" alt="society sideimage" /></div>
      </div>
      <div className='afbackgroundimg'>
        <div className='Addflatdisplay'>
          <label>Add Flat</label>
        </div>
        <Form className='formclass'>
          {/* <div class="form-group row">
            <label for="inputentryno" class="col-sm-2 col-md-2 col-lg-2 col-form-label ADN_label">Community</label>
            <div class="col-sm-4 col-md-4 col-lg-4">
              <select class="form-control input-lg ADTBorder" id='community_select' onChange={(e) => { getBlocks(e) }}>
                <option value={null} disabled selected>  </option>
                  {community.map(item=>{
                  return (
                    <option value={item.id}>{item.name}</option>
                  )
                })}  
              </select>
            </div>
          </div> */}
          <div class="form-group row">
            <label class="col-lg-2 col-form-label ADN_label">Blocks</label>
            <div class="col-lg-4">
              <select class="form-control input-lg ADTBorder" id="block_select" onChange={(e) => { getBlocks(e) }} placeholder="Block">
                <option value={null} disabled selected>Select Block</option>
                {block.map(item => {
                  return (
                    <option value={item.id}>{item.name}</option>
                  )
                })}
              </select>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-2 col-form-label ADN_label">Flat No</label>
            <div class="col-lg-4">
              <input type="text" class="form-control input-lg ADTBorder" id='flat_no' name="flatNo" placeholder="Flat No"></input>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-2 col-form-label ADN_label">Description</label>
            <div class="col-lg-4">
              <textarea type="text" id='description' class="form-control input-lg ADTBorder" name="description" placeholder="Description"></textarea>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-2 col-form-label ADN_label">Status</label>
            <div class="col-lg-4">
              <select class="form-control input-lg ADTBorder" id="status" placeholder="Status">
                <option value={null} disabled selected>Select Status</option>
                <option value={1}>Occupied</option>
                <option value={0}>Empty</option>
              </select>

            </div>
          </div>

          <button type="submit" onClick={(e) => { handleSubmit(e) }} className="btnAddflat">Add Flat</button>
        </Form>

      </div>
    </div>
  )
}

export default Addflat

