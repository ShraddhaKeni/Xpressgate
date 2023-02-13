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
import { Loader } from "../Loader";
import GuardMobileSidebar from '../GuardMobileSidebar';

const Dailyhelplist = () => {
  const [loading, setLoading] = useState(true)
  const [dailyhelpdata, setDailyhelpdata] = useState([])
  const [currentPage, setCurrentpage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(9)
  const [currentPosts, setCurrentPosts] = useState([])
  const [allowed, setAllowed] = useState([])
  const [menu, setMenuOpen] = useState(false)

  //const [flatdata, setFlatdata] = useState([])
  useEffect(() => {
    if (checkGuard()) {
      const config = {
        headers: {
          'x-access-token': localStorage.getItem('accesstoken')
        }
      }
      axios.get(`${window.env_var}api/guard/checkLogin`, config)
        .then(({ data }) => {
          getData()
        })
        .catch(err => {
          localStorage.clear();
          window.location.href = '/guardLogin'
        })
      setLoading(false);
    }
    else {
      window.location.href = '/'
    }

  }, [])


  const getData = async () => {
    try {

      const { data } = await axios.get(`${window.env_var}api/helperlist/getAll`)
      setDailyhelpdata(data.data.list)

      const indexoflast = currentPage * postPerPage  //endoffset
      const indexoffirst = indexoflast - postPerPage //startoffset
      setCurrentPosts(data.data.list.filter(x => x.booking_id.length != 0).slice(indexoffirst, indexoflast))
    } catch {
      console.log('Please try again');
    }

  }

  async function paginate(event) {
    const { data } = await axios.get(`${window.env_var}api/helperlist/getAll`)
    setCurrentpage(event.selected + 1)
    const indexoflast = (event.selected + 1) * postPerPage  //endoffset
    const indexoffirst = (indexoflast - postPerPage) //startoffset
    //setCurrentPosts(data.data.list.slice(indexoffirst,indexoflast))
    setCurrentPosts(data.data.list.filter(x => x.booking_id.length != 0).slice(indexoffirst, indexoflast))
  }

  const navigate = useNavigate();

  const routeChange = (id, image) => {
    navigate('/dailyservice', { state: { id: id, image } })
  }

  // if(currentPosts!==0)
  //   return <div>No Records Found </div>

  return (
    <>
      <div className="dailyhelplistcontainer">
        <div id="dhlheadersection">
          <GuardHeader onMenuClick={() => {
            setMenuOpen(true)
          }} />
        </div>
        <div id="dhlguardnamesection">
          <div className='DHL_Name'>
            <img src="/images/guardnameicon.svg" alt="guard name" />
            <label>{localStorage.getItem('name')}</label>
          </div>
          <div className='DHL_SideImg'><img src="/images/sideimage.svg" alt="dashboard sideimage" /></div>
        </div>
        <div className='dhlbackgroundimg'>
          {/* <div id="cardsection"> */}
          <div className='DHL_display'>
            <label>Daily Help List</label>
          </div>
          <div className="row row-cols-2 row-cols-md-3 g-4 dhfullcardscss allcards ">

            {currentPosts.map((dailydata) => {

              return (

                <div className="col card_hover_animation" onClick={() => routeChange(dailydata._id, dailydata.helper_image)}><br></br>
                  <div className="dailyhelpminicard"><br></br><br></br>
                    <img className="dhcard-img-top" src={`${window.env_var}` + dailydata.helper_image} alt="profile"></img><br></br>
                    <label className='dhlcard-titlename'>{dailydata.helper_name}</label><br></br>
                    <label className='dhlcard-profession'>{dailydata.service}</label><br />
                    <label className='dhcard-allowedhouses'>Allowed in {dailydata.booking_id.length} Houses</label><br></br>
                  </div>

                </div>
              )
            })}
          </div>
          <div style={{ marginTop: '0.5%' }}>

            <PaginationCalculate totalPages={dailyhelpdata.filter(x => x.booking_id.length != 0).length} postperPage={postPerPage} currentPage={currentPage} paginate={paginate} />
          </div>
          {/* </Loader> */}
        </div>


      </div>
      <GuardMobileSidebar open={menu} onHide={() => setMenuOpen(false)} />

    </>




  )
}

export default Dailyhelplist