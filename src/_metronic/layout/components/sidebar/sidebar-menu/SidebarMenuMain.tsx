/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import {useIntl} from 'react-intl'
// import {KTSVG} from '../../../../helpers'
import {SidebarMenuItemWithSub} from './SidebarMenuItemWithSub'
import {SidebarMenuItem} from './SidebarMenuItem'

const SidebarMenuMain = () => {
  const intl = useIntl()

  return (
    <>
      <SidebarMenuItem
        to='/admin/dashboard'
        icon='/media/icons/duotune/art/art002.svg'
        title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
        fontIcon='bi-app-indicator'
      />
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Crafted</span>
        </div>
      </div>
      <SidebarMenuItem
        to='/admin/storage-periods'
        icon='/media/icons/duotune/general/gen022.svg'
        title={'Storage Period List'}
        fontIcon='bi-app-indicator'
      />
      <SidebarMenuItem
        to='/admin/clients'
        icon='/media/icons/duotune/communication/com006.svg'
        title={'Customer list'}
        fontIcon='bi-app-indicator'
      />
      <SidebarMenuItem
        to='/admin/dashboard'
        icon='/media/icons/duotune/general/gen040.svg'
        title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
        fontIcon='bi-app-indicator'
      />
      <SidebarMenuItem
        to='/admin/dashboard'
        icon='/media/icons/duotune/general/gen025.svg'
        title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
        fontIcon='bi-layers'
      />
      <SidebarMenuItem
        to='/admin/dashboard'
        icon='/media/icons/duotune/communication/com012.svg'
        title='dashboard'
        fontIcon='bi-layers'
      />
      <SidebarMenuItem
        to='/admin/dashboard'
        icon='/media/icons/duotune/general/gen051.svg'
        title='User management'
        fontIcon='bi-layers'
      />
      <SidebarMenuItemWithSub to='/admin/orders/all' title='Client Group' icon='/media/icons/duotune/general/gen051.svg'>
        <SidebarMenuItem to='/admin/orders/all' title='All' hasBullet={true} />
        <SidebarMenuItem to='/admin/orders/all' title='Projects' hasBullet={true} />
        <SidebarMenuItem to='/admin/orders/all' title='Projects' hasBullet={true} />
        <SidebarMenuItem to='/admin/orders/all' title='Projects' hasBullet={true} />
        <SidebarMenuItem to='/admin/orders/all' title='Projects' hasBullet={true} />
        <SidebarMenuItem to='/admin/orders/all' title='Projects' hasBullet={true} />
        <SidebarMenuItem to='/admin/orders/all' title='Projects' hasBullet={true} />
      </SidebarMenuItemWithSub>
    </>
  )
}

export {SidebarMenuMain}
