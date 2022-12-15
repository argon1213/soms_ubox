import {KTSVG} from '../../../../../../_metronic/helpers'
import {useClientsListView} from '../../core/ClientsListViewProvider'

const UsersListToolbar = () => {
  
  const {setItemIdForUpdate} = useClientsListView()
  const openAddUserModal = () => {
    setItemIdForUpdate(null);
  }

  return (
    <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
      <button type='button' className='btn btn-primary d-flex justify-content-around align-items-center' onClick={openAddUserModal}>
        <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
        Add
      </button>
    </div>
  )
}

export {UsersListToolbar}
