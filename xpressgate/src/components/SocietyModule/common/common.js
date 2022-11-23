import axios from 'axios'


//Only use These functions where NO parameters are supposed to be passed

export const getBlocks=async()=>{
    try {
        
        const {data} = await axios.post(`${window.env_var}api/block/get`,{   //will be changed
          community_id:'632970d054edb049bcd0f0b4'
        })

        return (data.data.block)
      } catch (error) {
        console.log(error)
      }
}

export const getVendors=async()=>{
    try {
        const {data} = await axios.get(`${window.env_var}api/vendor/getAll`)
        return(data.data.vendors)
      } catch (error) {
        console.log(error)
      }
}

export const getResidents=async()=>{
    try {
        const {data} = await axios.get(`${window.env_var}api/resident/getall`)
        return(data.data.Resident)
    } catch (error) {
      
    }
}