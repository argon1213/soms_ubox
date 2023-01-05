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
        to='/admin/clients'
        icon='/media/icons/duotune/communication/com006.svg'
        title={'Customer list'}
        fontIcon='bi-app-indicator'
      />
      <SidebarMenuItem
        to='/admin/payments'
        icon='/media/icons/duotune/general/gen051.svg'
        title='Payment History'
        fontIcon='bi-layers'
      />
      <SidebarMenuItem
        to='/admin/storage-periods'
        icon='/media/icons/duotune/general/gen022.svg'
        title={'Storage Period List'}
        fontIcon='bi-app-indicator'
      />
      <SidebarMenuItem
        to='/admin/promotions'
        icon='/media/icons/duotune/general/gen040.svg'
        title='Promotion List'
        fontIcon='bi-app-indicator'
      />
      <SidebarMenuItemWithSub to='/admin/orders' title='Client Group' icon='/media/icons/duotune/general/gen051.svg'>
        <SidebarMenuItem to='/admin/orders/90' title='All' hasBullet={true} />
        <SidebarMenuItem to='/admin/orders/1' title='HKU' hasBullet={true} />
        <SidebarMenuItem to='/admin/orders/2' title='PolyU' hasBullet={true} />
        <SidebarMenuItem to='/admin/orders/3' title='CityU' hasBullet={true} />
        <SidebarMenuItem to='/admin/orders/8' title='SYU' hasBullet={true} />
        <SidebarMenuItem to='/admin/orders/4' title='CHCHE' hasBullet={true} />
        <SidebarMenuItem to='/admin/orders/5' title='LU' hasBullet={true} />
        <SidebarMenuItem to='/admin/orders/6' title='UST' hasBullet={true} />
        <SidebarMenuItem to='/admin/orders/7' title='HKBU' hasBullet={true} />
        <SidebarMenuItem to='/admin/orders/0' title='ubox Group' hasBullet={true} />
      </SidebarMenuItemWithSub>
    </>
  )
}

export {SidebarMenuMain}
