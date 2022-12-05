import axios from 'axios';

const axiosClient = axios.create({ baseURL: 'http://143.110.187.80:5050/api/' });

axiosClient.defaults.headers = {
    Accept: 'application/json',
    'x-access-token': localStorage.getItem('accesstoken') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzAyMTcxODUsImV4cCI6MTY3MDMwMzU4NX0.-K-Ln3AhRW3i67mRsQ3Pzj_m9DqNBl4jnHskb-2QEmk'
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
