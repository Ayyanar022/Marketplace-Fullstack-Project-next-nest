import UserLayout from '@/layouts/UserLayout'
import React, { ReactElement } from 'react'

const Orders = () => {
  return (
    <div>
      orders
orders
    </div>
  )
}

Orders.getLayout = function getLayout(page:ReactElement){
  return <UserLayout>{page}</UserLayout>
}
export default Orders
