import axios from 'axios';

const axiosClient = axios.create();

axiosClient.defaults.baseURL = 'https://jsonplaceholder.typicode.com/';

axiosClient.defaults.headers = {
    Accept: 'application/json',
    'x-access-token': localStorage.getItem('accesstoken')
};

axiosClient.defaults.timeout = 3000;

axiosClient.defaults.withCredentials = true;

export function getRequest(URL) {
    return axiosClient.get(`/${URL}`).then(response => response);
}

export function postRequest(URL, payload) {
    return axiosClient.post(`/${URL}`, payload).then(response => response);
}

export function patchRequest(URL, payload) {
    return axiosClient.patch(`/${URL}`, payload).then(response => response);
}

export function deleteRequest(URL) {
    return axiosClient.delete(`/${URL}`).then(response => response);
}
