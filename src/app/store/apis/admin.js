import axios from "./index";

export function fetchUniversitiesApi() {
  return axios.post(`/admin/fetchUniversities`, {
      headers: {
          'content-type': 'text/json'
      }
  });
}

export function fetchClientsApi() {
  return axios.post(`/admin/fetchClients`, {
      headers: {
          'content-type': 'text/json'
      }
  });
}

export function fetchPeriodsApi() {
  return axios.post(`/admin/fetchPeriods`, {
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