import React, { useEffect, useRef, useState } from 'react'
import {motion,useTransform,useMotionValue} from 'framer-motion'
import './Loader.css'
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';

const ErrorScreen = () => {

  const motionRef = useRef()
  const [point,setPoint] = useState({x:0,y:0})


  useEffect(()=>{
    const pointerMovement =({ clientX, clientY })=>{
      const elem = motionRef.current;
      let x = clientX-elem.offsetLeft - elem.offsetWidth / 2
      let y = clientY - elem.offsetTop - elem.offsetHeight / 2;
      
      setPoint({x,y})
    }
  
    window.addEventListener("pointermove",pointerMovement)

    return ()=>window.removeEventListener("pointermove", pointerMovement);
  },[])



  return (
   
      <div
     
      className="box"
      style={{width:'550px',height:'550px',fontSize:'20px',textAlign:'center',position:'relative',top:'150px',left:'35%'}}
      ref={motionRef}
     
      >
        <ErrorOutlinedIcon className='error_icon'> </ErrorOutlinedIcon>
        <h3>Oh snap !</h3>
        <br/>
        <br/>
        <h4>
            An Error has occured while loading the page.
        </h4>
        <motion.button 
          whileHover={{background:'red'}}
          onClick={()=>window.history.back(-1)}
          transition={{ type: "spring", stiffness: 100 }}

         className='dismiss_error'>Dismiss</motion.button>
        
      </div>
  )
}

export default ErrorScreen