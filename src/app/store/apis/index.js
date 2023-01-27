import axios from "axios";
const instance = axios.create({ baseURL: process.env.REACT_APP_API_ENDPOINT });
axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
export default instance;
