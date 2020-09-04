import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.174.131:3333',//https://9d-m4g.anonymous.mobile.exp.direct:3333
});

export default api;