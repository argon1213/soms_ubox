import {useEffect, useState} from 'react';
import {KTCardBody} from '../../../../../_metronic/helpers';

import { PeriodsTableBody } from './PeriodsTableBody';
import { useListView } from '../core/ListViewProvider';
import { StoragePeriodPagination } from '../components/pagination/StoragePeriodsPagination';

const PeriodsTable = () => {
  const { data, setSelected, isAllSelected, pagination, setPagination } = useListView();
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
    setPagination({
      ...pagination,
      sort: __sort,
      orderBy: order,
    });
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
      <div className='card-body py-3'>
        <div className='table-responsive'>
          <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
            <thead>
              <tr className='fw-bold text-muted align-middle'>
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
                <th className='min-w-150px'>
                  <div 
                    className={pagination.orderBy === "code" ? (pagination.sort ? (pagination.sort === "asc" ? "table-sort-asc" : "table-sort-desc") : "") : ""} 
                    onClick={() => onSortHandler("code")}
                    style={{cursor: 'pointer'}}
                  >
                    The Code
                  </div>
                </th>
                <th className='min-w-140px'>
                  <div 
                    className={pagination.orderBy ==="name" ? (pagination.sort ? (pagination.sort === "asc" ? "table-sort-asc" : "table-sort-desc") : "") : ""} 
                    onClick={() => onSortHandler("name")}
                    style={{cursor: 'pointer'}}
                  >
                    Name
                  </div>
                </th>
                <th className='min-w-120px text-center'>
                  <div 
                    className={pagination.orderBy ==="min" ? (pagination.sort ? (pagination.sort === "asc" ? "table-sort-asc" : "table-sort-desc") : "") : ""} 
                    onClick={() => onSortHandler("min")}
                    style={{cursor: 'pointer'}}
                  >
                    Minimum storage period(months)
                  </div>
                </th>
                <th className='min-w-120px text-center'>
                  <div 
                    className={pagination.orderBy ==="max" ? (pagination.sort ? (pagination.sort === "asc" ? "table-sort-asc" : "table-sort-desc") : "") : ""} 
                    onClick={() => onSortHandler("max")}
                    style={{cursor: 'pointer'}}
                  >
                    The longest storage period(months)
                  </div>
                </th>
                <th className='min-w-100px text-center'>
                  <div 
                    className={pagination.orderBy ==="updated_at" ? (pagination.sort ? (pagination.sort === "asc" ? "table-sort-asc" : "table-sort-desc") : "") : ""} 
                    onClick={() => onSortHandler("updated_at")}
                    style={{cursor: 'pointer'}}
                  >
                    Updated at
                  </div>
                </th>
                <th className='min-w-100px text-end'>Action</th>
              </tr>
            </thead>
            <tbody>
              <PeriodsTableBody listData={listData} setListData={setListData} />
            </tbody>
          </table>
        </div>
        <div className='d-flex justify-content-end my-7'>
          <StoragePeriodPagination />
        </div>
      </div>
    </KTCardBody>
  )
}

export {PeriodsTable}
