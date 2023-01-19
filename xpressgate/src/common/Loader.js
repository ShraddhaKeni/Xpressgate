import React, { useRef } from 'react'
import { motion,LazyMotion } from "framer-motion"
import './Loader.css'

const Loader = () => {

const loader = useRef()

const outerDiv= {
    start:{
        transition: {
            staggerChildren: 0.5
          }
    },
    end:{
        transition: {
            staggerChildren: 0.5
          }
    }
}

return(
    <motion.div className='loader_animation'>
        <motion.span className='main-loader-div' animate={{
        scale: [1, 2, 2, 1, 1],
        rotate: [0, 0, 180, 180, 0],
        borderRadius: ["10%", "10%", "50%", "50%", "10%"],
        borderColor:['#14335D','#0A8996'],
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: Infinity,
        repeatDelay: 1
      }}></motion.span>
    </motion.div>    
    )
}

export default Loader