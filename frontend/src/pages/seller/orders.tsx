import SellerLayout from '@/layouts/SellerLayout'
import React, { ReactElement } from 'react'

const Orders = () => {
  return (
    <div>
      Orders
Orders
    </div>
  )
}

Orders.getLayout = function getLayout(page:ReactElement){
  return <SellerLayout>{page}</SellerLayout>
}

export default Orders
