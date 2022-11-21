import axios from "axios";
const instance = axios.create({ baseURL: "http://127.0.0.1:8000/api/v1" });
axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
export default instance;
