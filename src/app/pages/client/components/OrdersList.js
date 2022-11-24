/* eslint-disable jsx-a11y/anchor-is-valid */
import OrderRow from "./OrderRow"

const OrdersList = ({className, orders}) => {
  return (
    <div className={`card ${className}`}>
      {/* begin::Body */}
      <div className='py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table align-middle gs-7 gy-7 gx-4'>
            {/* begin::Table head */}
            <thead>
              <tr className='text-normal fw-bold fs-5 border-bottom border-gray-500'>
                <th className='min-w-[160px]'>Order No.</th>
                <th className='min-w-[90px]'>Status</th>
                <th className='min-w-[170px]'>OrderDate</th>
                <th className='min-w-[140px]'>Tentative Retrieval Date</th>
                <th className='min-w-[120px]'>Checkout Date</th>
                <th className='min-w-[80px]'>Total Fee</th>
                <th className='min-w-[100px]'>Outstanding Fee</th>
                <th className='min-w-[120px]'>QR Code</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {orders.map((order, index) => {
                return (
                  <OrderRow order={order} index={index} />
                )
              })}
            </tbody>
            {/* end::Table body */}
          </table>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
      {/* begin::Body */}
    </div>
  )
}

export default OrdersList
