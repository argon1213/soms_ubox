import axios from "./index";

export function updateAccountApi(params) {
  return axios.post(`/client/account/update`, params, {
      headers: {
          'content-type': 'text/json'
      }
  });
}

export function fetchAccountApi(params) {
  return axios.post(`/client/getUser`, params, {
    headers: {
      'content-type': 'text/json'
    }
  });
}

export function changePasswordApi(params) {
  return axios.post('/client/changePassword', params, {
    headers: {
      'content-type': 'text/json'
    }
  });
}

export function updateOrderApi(params) {
  return axios.post('/client/updateOrder', params, {
    headers: {
      'content-type': 'text/json'
    }
  });
}

export function fetchOrdersApi(params) {
  return axios.post('/client/getOrders', params, {
    headers: {
      'content-type': 'text/json'
    }
  });
}

export function fetchCurrentOrderApi(params) {
  return axios.post('/client/fetchCurrentOrder', params, {
    headers: {
      'content-type': 'text/json'
    }
  });
}

export function SendEmailforgotPassword(params) {
  return axios.post('/client/emailOtpForgotPassword', params, {
    headers: {
      'content-type': 'text/json'
    }
  });
}

export function SendCodeResetPassword(params) {
  return axios.post('/client/resetPassword', params, {
    headers: {
      'content-type': 'text/json'
    }
  });
}