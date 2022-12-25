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

export function fetchProductsApi() {
  return axios.post(`/admin/fetchProducts`, {
      headers: {
          'content-type': 'text/json'
      }
  });
}

export function fetchRefApi() {
  return axios.post(`/admin/fetchRef`, {
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

export function editPeriodItemApi(params) {
  return axios.post(`/admin/editPeriodItem`, {...params}, {
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

export function fetchPaymentsApi(params) {
  return axios.post(`/admin/fetchPayments`, {...params}, {
      headers: {
          'content-type': 'text/json'
      }
  });
}

export function deletePaymentsApi(params) {
  return axios.post(`/admin/deletePayment`, {...params}, {
      headers: {
          'content-type': 'text/json'
      }
  });
}

export function editPaymentsApi(params) {
  return axios.post(`/admin/editPayment`, {...params}, {
      headers: {
          'content-type': 'text/json'
      }
  });
}

export function paymentPaidApi(params) {
  return axios.post(`/admin/payment/paid`, {...params}, {
      headers: {
          'content-type': 'text/json'
      }
  });
}

export function paymentCancelledApi(params) {
  return axios.post(`/admin/payment/cancelled`, {...params}, {
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

export function editPromotionApi(params) {
  return axios.post(`/admin/editPromotion`, {...params}, {
      headers: {
          'content-type': 'text/json'
      }
  });
}

export function editPromotionItemApi(params) {
  return axios.post(`/admin/editPromotionItem`, {...params}, {
      headers: {
          'content-type': 'text/json'
      }
  });
}

export function deletePromotionApi(params) {
  return axios.post(`/admin/deletePromotion`, {...params}, {
      headers: {
          'content-type': 'text/json'
      }
  });
}

export function fetchOrdersApi(params) {
  return axios.post(`/admin/fetchOrders`, {...params}, {
      headers: {
          'content-type': 'text/json'
      }
  });
}

export function editOrderApi(params) {
  return axios.post(`/admin/editOrder`, {...params}, {
      headers: {
          'content-type': 'text/json'
      }
  });
}

export function deleteOrderApi(params) {
  return axios.post(`/admin/deleteOrder`, {...params}, {
      headers: {
          'content-type': 'text/json'
      }
  });
}

export function sendInvoiceApi(params) {
  return axios.post(`/admin/sendInvoice`, {...params}, {
      headers: {
          'content-type': 'text/json'
      }
  });
}