import {usePromotionsListView} from '../../core/PromotionsListViewProvider'

const UsersListGrouping = () => {
  const {selected, setItemIdForDelete} = usePromotionsListView()

  const deleteHandler = () => {
    let id: any[];
    id = selected.map((element) => element.id);
    setItemIdForDelete(id);
  }
  
  return (
    <div className='d-flex justify-content-end align-items-center' style={{paddingRight: '15px'}}>
      <div className='fw-bolder me-5'>
        <span className='me-2'>{selected.length}</span> Selected
      </div>

      <button
        type='button'
        className='btn btn-danger'
        onClick={deleteHandler}
      >
        Delete Selected
      </button>
    </div>
  )
}

export {UsersListGrouping}
