import axios from "./index";

export function login(user) {
  return axios.post(`/login`, user);
}

export function logout() {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Headers": "Access-Control-*, Origin, X-Requested-With, Content-Type, Accept",
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Credentials':true,
  };
  
  return axios.post(`/auth/logout`, {}, {headers: headers,});
}

export function signup(user) {
  return axios.post("/register", user);
}
