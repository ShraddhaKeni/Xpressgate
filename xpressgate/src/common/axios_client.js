import axios from 'axios';

const axiosClient = axios.create({ baseURL: 'http://143.110.187.80:5050/api/' });

axiosClient.defaults.headers = {
    Accept: 'application/json',
    'x-access-token': localStorage.getItem('accesstoken') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzAzODU3OTUsImV4cCI6MTY3MDQ3MjE5NX0.xUVyHED5x-ndeVxL2R34gR_IJuIVwye3a3vHL__6nUg'
};

axiosClient.defaults.timeout = 5000;


export async function getRequest(URL) {
    return axiosClient.get(URL).then(response => response);
}

export async function postRequest(URL, payload) {
    console.log(payload)
    return axiosClient.post(URL, payload).then(response => response);
}

export async function patchRequest(URL, payload) {
    return axiosClient.patch(URL, payload).then(response => response);
}

export async function deleteRequest(URL) {
    return axiosClient.delete(URL).then(response => response);
}
