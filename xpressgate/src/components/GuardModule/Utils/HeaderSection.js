import React, { useEffect,useState } from 'react'
import LogOut from './LogOut'
import './Utils.css';
import './styles/HeaderSection.css'
import axios from 'axios'
import { getDefaultNormalizer } from '@testing-library/react';
const HeaderSection = () => {

  const [notifications,setNotifications] = useState([])
  useEffect(()=>{
      getData()
  },[])

  const getData=async()=>{
    try {
      const {data} = await axios.get(`/api/guard/notifications/getAll/${localStorage.getItem('guard_id')}`)
      setNotifications(data.data)
    } catch (error) {
      console.log(error)
    } 
  }

  return (
    <div className="Headercontainer">
     
      <div className='notifications'>
        <div className='notification_div'>
            <ul className='notification_ul'>
              {notifications.map(items=>{
                return(
                  <li className='notification_li'>
                    <div>
                      <h2>
                        {items.notification}
                      </h2>
                      <h7>
                       {items.resident_firstname} {items.resident_lastname} ({items.Flat_number}, {items.Block_name})
                      </h7>
                    </div>
                </li>
                )
              })}
          </ul>
        </div>
      </div>
    </div>

  )
}

export default HeaderSection