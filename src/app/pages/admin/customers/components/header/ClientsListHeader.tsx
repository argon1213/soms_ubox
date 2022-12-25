import {useClientsListView} from '../../core/ClientsListViewProvider'
import {UsersListToolbar} from './UserListToolbar'
import {UsersListGrouping} from './UsersListGrouping'
import {UsersListFilter} from './UsersListFilter'

// import {UsersListSearchComponent} from './UsersListSearchComponent'

const ClientsListHeader = () => {
  const {selected} = useClientsListView()
  return (
    <div className='card-header border-0'>

      <div className='card-toolbar'>
          <div className='d-flex justify-content-start align-items-center'>
            {selected.length > 0 ? <UsersListGrouping /> : <></>}
            <UsersListFilter />
          </div>
      </div>

      <div className='card-toolbar'>
        <UsersListToolbar />
      </div>

      
    </div>
  )
}

export {ClientsListHeader}