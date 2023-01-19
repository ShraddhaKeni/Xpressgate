import React, { useEffect, useRef, useState } from 'react'
import {motion,useTransform,useMotionValue} from 'framer-motion'
import './Loader.css'

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
   
      <motion.div
     
      className="box"
      style={{width:'250px',height:'250px',borderRadius:'50%',fontSize:'20px',textAlign:'center',position:'relative'}}
      ref={motionRef}
      animate={{x:point.x,y:point.y}}
      onClick={()=>window.history.back(-1)}
      >
        <h3 style={{position:'absolute',top:'40%'}}>
            404: Click To Go Back.
        </h3>
        
      </motion.div>
  )
}

export default ErrorScreen