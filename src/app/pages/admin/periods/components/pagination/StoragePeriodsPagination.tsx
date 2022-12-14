import React from "react"
import { Pagination } from "antd"

export const StoragePeriodPagination: React.FC = () => {

  return (
    <>
      <Pagination 
        defaultCurrent={1} 
        total={10} 
        showSizeChanger 
        pageSizeOptions={[10, 15, 20, 30]}
      />
    </>
  )
}