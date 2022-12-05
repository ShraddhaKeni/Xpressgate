import axios from 'axios'


//Only use These functions where NO parameters are supposed to be passed

export const getBlocks=async()=>{
    try {
        
        const {data} = await axios.post(`${window.env_var}api/block/get`,{   //will be changed
          community_id:localStorage.getItem('community_id')
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

export const getGuestList=async()=>{
    try {
        const {data}= await axios.post(`${window.env_var}api/guard/getallguest`,{community_id:localStorage.getItem('community_id')})
        return (data.data.guests_list)
    } catch (error) {
        console.log(error)
    }
}

export const getAmenitiesBooked = async(id)=>{
  try {
    const {data} = await axios.get(`${window.env_var}api/resident/booking/byEmenity/${id}`)
    return (data.data.amenities)
  } catch (error) {
    console.log(error)
  }
}

export const getAmenities=async()=>{
  try {
    const {data} = await axios.get(`${window.env_var}api/society/amenities/getAll`)
    return(data.data.amenities)
  } catch (error) {
    console.log(error)
  }
}