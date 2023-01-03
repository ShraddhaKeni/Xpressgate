import React, { useEffect, useState } from 'react';
import './Dailyhelplist.css';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import LogOut from './Utils/LogOut';
import { Link, useNavigate } from 'react-router-dom'
import './otp.css';
import { checkGuard } from '../auth/Auth';
import PaginationCalculate from './Utils/paginationCalculate';
import GuardHeader from './Utils/GuardHeader';


const Dailyhelplist = () => {
  const [dailyhelpdata, setDailyhelpdata] = useState([])
  const [currentPage, setCurrentpage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(0)
  const [currentPosts,setCurrentPosts] = useState([])
  const [allowed, setAllowed] = useState([])

  //const [flatdata, setFlatdata] = useState([])
  useEffect(() => {
    if(checkGuard())
    {
      const config = {
        headers:{
          'x-access-token':localStorage.getItem('accesstoken')
        }
      }
     axios.get(`${window.env_var}api/guard/checkLogin`,config)
            .then(({data})=>{  
              getData() 
            })
            .catch(err=>{
              localStorage.clear();
              window.location.href='/guardLogin'
            })
              
    }
    else
    {
      window.location.href='/'
    }
   
  }, [])


  const getData = async () => {
    try {

      const {data} = await axios.get(`${window.env_var}api/helperlist/getAll`)
      setDailyhelpdata(data.data.list)
      console.log(dailyhelpdata[0])
      let perPage = Math.ceil(data.data.list.length / 6)
      setPostPerPage(perPage)
      //console.log(perPage)
      const indexoflast = currentPage*perPage  //endoffset
      const indexoffirst = indexoflast - perPage //startoffset
      setCurrentPosts(data.data.list.filter(x=>x.booking_id.length!=0).slice(indexoffirst,indexoflast))
      //setFlatdata(data.data.data.list[0].booking_id)
      //console.log(data.data.data.list[0].booking_id);
    } catch {
      console.log('Please try again');
    }

  }

  async function  paginate(event)
  {
    setCurrentpage(event.selected+1)
    let perPage = Math.ceil(dailyhelpdata.length / 6)
    setPostPerPage(perPage)
    const indexoflast = (event.selected+1)*perPage  //endoffset
    const indexoffirst = (indexoflast - perPage) //startoffset
    setCurrentPosts(dailyhelpdata.filter(x=>x.booking_id.length!=0).slice(indexoffirst,indexoflast))
  }

  const navigate = useNavigate();

  const routeChange = (id,image)=>{
    navigate('/dailyservice',{state:{id:id, image}})
  }

  // if(currentPosts!==0)
  //   return <div>No Records Found </div>

  return (
    <div className="dailyhelplistcontainer">
      <div id="dhlheadersection">
       <GuardHeader/>
      </div>
      <div id="dhlguardnamesection">
        <div className='DHL_Name'>
          <img src="/images/guardnameicon.svg" alt="guard name" />
          <label>Guard Name</label>
        </div>
        <div className='DHL_SideImg'><img src="/images/sideimage.svg" alt="dashboard sideimage" /></div>
      </div>
      <div className='dhlbackgroundimg'>
        <div id="cardsection">
          <div className='DHL_display'>
            <label>Daily Help List</label>
          </div>
          <div className="row row-cols-1 row-cols-md-3 g-4 dhfullcardscss">
            
            {currentPosts.map((dailydata) => {
             
                return (
                  
                  <div className="col" onClick={()=>routeChange(dailydata._id,dailydata.helper_image)}>
                    <div className="dailyhelpminicard"><br></br>
                      <img className="dhcard-img-top" src={`${window.env_var}` +dailydata.helper_image} alt="profile"></img><br></br>
                      <label className='dhlcard-titlename'>{dailydata.helper_name}</label><br></br>
                      <label className='dhlcard-profession'>{dailydata.service}</label><br></br><br></br>
                      <label className='dhcard-allowedhouses'>Allowed in {dailydata.booking_id.length} Houses</label><br></br>
                    </div>

                  </div>
              )
            })}
          </div>
          
        </div>
        <div style={{marginTop:'1.5%'}}>

          <PaginationCalculate totalPages={dailyhelpdata.filter(x=>x.booking_id.length!=0).length} postperPage={postPerPage} currentPage={currentPage} paginate={paginate}/>
        </div>
      </div>
      
    </div>
  )
}

export default Dailyhelplist

