import {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import {KTCardBody} from '../../../../../_metronic/helpers';

import { PaymentsTableBody } from './PaymentsTableBody';
import { usePaymentsListView } from '../core/PaymentsListViewProvider';
import { PaymentsPagination } from '../components/pagination/PaymentsPagination';
import { fetchPayments } from '../../../../store/actions/admin';

const PaymentsTable = () => {

  const dispatch = useDispatch();
  const { orderId, data, setSelected, isAllSelected, pagination, filterData } = usePaymentsListView();
  const [listData, setListData] = useState(Array(0));

  const onSortHandler = (order: string) => {
    let __sort: string | undefined = undefined;
    if(pagination.orderBy === order) {
      if(pagination.sort) {
        pagination.sort === "desc" ? __sort = "asc" : __sort = undefined;
      } else {
        __sort = "desc";
      }
    } else {
      __sort = "desc";
    }
    dispatch(fetchPayments({
      filterData,
      orderId,
      ...pagination,
      sort: __sort,
      orderBy: order,
    }));
  };

  useEffect(() => {
    let __data = data;
    __data.forEach((element:any, index:number) => {
      element = {
        ...element,
        checked: false,
      };
    });
    setListData(__data);
  }, [data]);

  useEffect(() => {
    let __checked = [];
    __checked = listData.filter((data) => data.checked === true);
    setSelected(__checked);
  }, [listData, setSelected]);

  return (
    <KTCardBody className='py-4'>
      <div className='card-body py-3' style={{position: 'relative'}}>
        <div className='table-responsive min-h-300px'>
          <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
            <thead>
              <tr className='fw-bold text-muted align-middle fs-5'>
                <th className='w-25px'>
                  <div className='form-check form-check-sm form-check-custom form-check-solid'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      data-kt-check='true'
                      data-kt-check-target='.widget-9-check'
                      checked={isAllSelected}
                      onChange={(e) => {
                        let __listData = listData;
                        __listData.forEach((data:any) => {
                          data.checked = e.target.checked;
                        });
                        setListData([...__listData]);
                      }}
                    />
                  </div>
                </th>
                <th className='min-w-175px'>
                  <div 
                    className={pagination.orderBy === "code" ? (pagination.sort ? (pagination.sort === "asc" ? "table-sort-asc" : "table-sort-desc") : "") : ""} 
                    onClick={() => onSortHandler("code")}
                    style={{cursor: 'pointer'}}
                  >
                    Payment Code
                  </div>
                </th>
                <th className='min-w-100px'>
                  <div 
                    className={pagination.orderBy ==="client_id" ? (pagination.sort ? (pagination.sort === "asc" ? "table-sort-asc" : "table-sort-desc") : "") : ""} 
                    // onClick={() => onSortHandler("client_id")}
                    style={{cursor: 'pointer'}}
                  >
                    Client
                  </div>
                </th>
                <th className='min-w-125px text-center'>
                  <div 
                    className={pagination.orderBy ==="code" ? (pagination.sort ? (pagination.sort === "asc" ? "table-sort-asc" : "table-sort-desc") : "") : ""} 
                    // onClick={() => onSortHandler("code")}
                    style={{cursor: 'pointer'}}
                  >
                    Order ID
                  </div>
                </th>
                <th className='min-w-100px text-center'>
                  <div 
                    className={pagination.orderBy ==="amount" ? (pagination.sort ? (pagination.sort === "asc" ? "table-sort-asc" : "table-sort-desc") : "") : ""} 
                    onClick={() => onSortHandler("amount")}
                    style={{cursor: 'pointer'}}
                  >
                    Amount
                  </div>
                </th>
                <th className='min-w-100px text-center'>
                  <div 
                    className={pagination.orderBy ==="payment_status_id" ? (pagination.sort ? (pagination.sort === "asc" ? "table-sort-asc" : "table-sort-desc") : "") : ""} 
                    onClick={() => onSortHandler("payment_status_id")}
                    style={{cursor: 'pointer'}}
                  >
                    Order Status
                  </div>
                </th>
                <th className='min-w-125px text-center'>
                  <div 
                    className={pagination.orderBy ==="completed_at" ? (pagination.sort ? (pagination.sort === "asc" ? "table-sort-asc" : "table-sort-desc") : "") : ""} 
                    onClick={() => onSortHandler("updated_at")}
                    style={{cursor: 'pointer'}}
                  >
                    Action Date
                  </div>
                </th>
                <th className='min-w-300px text-end'>Action</th>
              </tr>
            </thead>
            <tbody>
              <PaymentsTableBody listData={listData} setListData={setListData} />
            </tbody>
          </table>
          {
            listData.length === 0 &&
            <div 
              className='w-100 text-center text-muted fw-bold fs-6'
              style={{position: 'absolute', top: '100px'}}
            >
              No matching records found
            </div>
          }
        </div>
        <div className='d-flex justify-content-end my-7'>
          <PaymentsPagination />
        </div>
      </div>
    </KTCardBody>
  )
}

export {PaymentsTable}
