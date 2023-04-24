
import axios from 'axios'

const axios_client = axios.create()

axios_client.defaults.baseURL = 'http://localhost:5050/'

axios_client.defaults.headers = {
    'x-access-toke':localStorage.getItem('accesstoken')
}


export const getData=async(url)=>{
    try {
        const {data} = await axios_client.get(`${url}`)
        return data.data
    } catch (error) {
        console.log(error)
    }
}

export const postData= async(url,payload)=>{
    try {
        
        const {data} = axios_client.post(`${url}`,payload)
       
        return data
    } catch (error) {
        console.log(error)
    }
}