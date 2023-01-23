import React, { useEffect, useState } from 'react';
import './Amenities.css';
import LogOut from '../../components/SocietyModule/Utils/LogOut';
import { getAmenities } from './common/common';
import { Navigate, useNavigate } from 'react-router-dom';
import Societyheader from './Utils/Societyheader';
import PaginationCalculate from '../GuardModule/Utils/paginationCalculate';
import axios from 'axios';
import { Loader } from "../Loader";
import ErrorScreen from '../../common/ErrorScreen';

const Amenities = () => {
  const [loading, setLoading] = useState(true)
  const [amenities,setAmenities] = useState([])
  const [currentPage, setCurrentpage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(9)
  const [currentPosts,setCurrentPosts] = useState([])
  const [isError,setError] = useState(false)
  const navigate = useNavigate()
  useEffect(()=>{
    getDetails()
  },[])


  const getDetails=async()=>{
    try {
    const {data} = await axios.get(`${window.env_var}api/society/amenities/getAll`)
    setAmenities(data.data.amenities)
    const indexoflast = currentPage*postPerPage  //endoffset
    const indexoffirst = indexoflast - postPerPage //startoffset
    setCurrentPosts(data.data.amenities.slice(indexoffirst,indexoflast))
    setLoading(false);
    setError(false)
  }
  catch (error) {
    setError(true)
  }
}

  async function  paginate(event)
  {
    setCurrentpage(event.selected+1)
    const indexoflast = (event.selected+1)*postPerPage  //endoffset
    const indexoffirst = (indexoflast - postPerPage) //startoffset
    setCurrentPosts(amenities.slice(indexoffirst,indexoflast))
  }

  const navigateToList=(id,type)=>{
    navigate('/amenitylist',{state:{id:id,type:type}})
  }
  if(isError)
  return <ErrorScreen/>
  return (

    <div className="amenitiescontainer">
      <div id="amntsheadersection">
        <Societyheader/>
      </div>
      <div id="amntsnamesection">
        <div className='ASname'>
          <img src="/images/societyicon.svg" alt="guard name" />
          <label>Society Name</label>
        </div>
        <div className='AMSideIMG'><img src="/images/societysideimg.svg" alt="dashboard sideimage" /></div>
      </div>
      <div className='amntsbackgroundimg'>
      <Loader loading={loading}>
        <div id="amntscard">
          <div className='Amendisplay'>
            <label>Amenities</label>
          </div>
          <button type="button" onClick={()=>{window.location.href='/addeditamenity'}} className="AddNAmenity">&#10011; Add New Amenities</button>
          <div className="row row-cols-1 row-cols-md-3 g-4 amntscss allcards">
            {currentPosts.map(items=>{
              return(
                <div className="col card_hover_animation" id={items.id} onClick={()=>{navigateToList(items.id,items.amenityType)}}>
                  <div className="amntsminicard"><br></br>
                    <img className="amnts_img_top" src={window.env_var+items.image} alt="profile"></img><br></br><br></br>
                    <label className='amntstitle'>{items.amenityType}</label>
                  </div>
                </div>
              )
            })}
            
          </div>
        </div>
        <div style={{marginTop:'0.5%'}}>
          <PaginationCalculate totalPages={amenities.length} postperPage={postPerPage} currentPage={currentPage} paginate={paginate}/>
        </div>
        </Loader>
      </div>
    </div>
  )
}

export default Amenities

