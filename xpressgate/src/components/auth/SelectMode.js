import React from 'react'
import { Button } from 'react-bootstrap'
import './selectMode.css'
const SelectMode = () => {

  const setMode = (value)=>{
    localStorage.setItem('mode',value)
    if(value=='guard')
    {
        window.location.href='/guardLogin'
    }
    else if (value=='society')
    {
      window.location.href='/societylogin'
    }
    else
    {
        window.location.href='/'    
    }
  }  
  return (
    <div>
        <div className='mainscreen_buttons'>
            <Button onClick={()=>{setMode('admin')}}>Admin</Button>
            <Button onClick={()=>{setMode('guard')}}>Guard</Button>
            <Button onClick={()=>{setMode('society')}}>Society</Button>
        </div>
    </div>
  )
}

export default SelectMode