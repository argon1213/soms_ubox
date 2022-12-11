import {useEffect, useState, useMemo} from 'react';
import {useTable} from 'react-table';
import { toAbsoluteUrl } from '../../../../../_metronic/helpers';
import { KTSVG } from '../../../../../_metronic/helpers';
import {KTCardBody} from '../../../../../_metronic/helpers';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/reducers';

import { PeriodsTableBody } from './PeriodsTableBody';

const PeriodsTable = () => {
  const periods = useSelector((state:RootState) => state.admin.periods.data)
  // const isLoading = useSelector((state:RootState) => state.admin.periods.loading)
  const data = useMemo(() => periods, [periods]);
  const [listData, setListData] = useState(Array(0));
  const [isAllSelected, setIsAllSelected] = useState(false);

  useEffect(() => {
    let __data = periods;
    __data.forEach((element:any, index:number) => {
      element = {
        ...element,
        checked: false,
      };
    });
    setListData(__data);
  }, []);

  useEffect(() => {
    console.log("listData", listData);
  }, [listData]);

  return (
    <KTCardBody className='py-4'>
      <div className='card-body py-3'>
        <div className='table-responsive'>
          <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
            <thead>
              <tr className='fw-bold text-muted'>
                <th className='w-25px'>
                  <div className='form-check form-check-sm form-check-custom form-check-solid'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      value='1'
                      data-kt-check='true'
                      data-kt-check-target='.widget-9-check'
                      checked={isAllSelected}
                      onChange={(e) => {
                        setIsAllSelected(e.target.checked);
                        let __listData = listData;
                        __listData.forEach((data:any) => {
                          data.checked = e.target.checked;
                        });
                        setListData(__listData);
                      }}
                    />
                  </div>
                </th>
                <th className='min-w-150px'>The Code</th>
                <th className='min-w-140px'>Name</th>
                <th className='min-w-120px text-center'>Minimum storage period(months)</th>
                <th className='min-w-120px text-center'>The longest storage period(months)</th>
                <th className='min-w-100px text-center'>Updated at</th>
                <th className='min-w-100px text-end'>Action</th>
              </tr>
            </thead>
            <tbody>
              <PeriodsTableBody listData={listData} setListData={setListData} />
            </tbody>
          </table>
        </div>
      </div>
    </KTCardBody>
  )
}

export {PeriodsTable}
