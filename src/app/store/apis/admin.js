import axios from "./index";

export function adminLoginApi(param) {
  return axios.post(`/admin/auth/login`, param, {
      headers: {
          'content-type': 'text/json'
      }
  });
}

export function fetchUniversitiesApi() {
  return axios.post(`/admin/fetchUniversities`, {
      headers: {
          'content-type': 'text/json'
      }
  });
}

export function fetchClientsApi(params) {
  return axios.post(`/admin/fetchClients`, {...params}, {
      headers: {
          'content-type': 'text/json'
      }
  });
}

export function deleteClientApi(params) {
  return axios.post(`/admin/deleteClient`, {...params}, {
      headers: {
          'content-type': 'text/json'
      }
  });
}

export function editClientApi(params) {
  return axios.post(`/admin/editClient`, {...params}, {
      headers: {
          'content-type': 'text/json'
      }
  });
}

export function fetchPeriodsApi(params) {
  return axios.post(`/admin/fetchPeriods`, {...params}, {
      headers: {
          'content-type': 'text/json'
      }
  });
}

export function editPeriodsApi(params) {
  return axios.post(`/admin/editPeriod`, {...params}, {
      headers: {
          'content-type': 'text/json'
      }
  });
}

export function deletePeriodsApi(params) {
  return axios.post(`/admin/deletePeriod`, {...params}, {
      headers: {
          'content-type': 'text/json'
      }
  });
}

export function fetchPaymentsApi() {
  return axios.post(`/admin/fetchPayments`, {
      headers: {
          'content-type': 'text/json'
      }
  });
}

export function fetchPromotionsApi(params) {
  return axios.post(`/admin/fetchPromotions`, {...params}, {
      headers: {
          'content-type': 'text/json'
      }
  });
}