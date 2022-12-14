// import {useQueryClient} from 'react-query'
// import {QUERIES} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
// import {useQueryResponse} from '../core/QueryResponseProvider'
// import {deleteSelectedUsers} from '../core/_requests'

const UsersListGrouping = () => {
  const {selected} = useListView()
  
  return (
    <div className='d-flex justify-content-end align-items-center' style={{paddingRight: '15px'}}>
      <div className='fw-bolder me-5'>
        <span className='me-2'>{selected.length}</span> Selected
      </div>

      <button
        type='button'
        className='btn btn-danger'
        // onClick={async () => await deleteSelectedItems.mutateAsync()}
      >
        Delete Selected
      </button>
    </div>
  )
}

export {UsersListGrouping}
