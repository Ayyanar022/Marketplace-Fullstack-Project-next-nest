import { useProtectedRoute } from '@/hooks/useProtectedRoute'
import UserLayout from '@/layouts/UserLayout'
import React, { ReactElement } from 'react'

const Orders = () => {

  useProtectedRoute(['CUSTOMER'])

  return (
    <div>
      orders
    </div>
  )
}

Orders.getLayout = function getLayout(page:ReactElement){
  return <UserLayout>{page}</UserLayout>
}
export default Orders
