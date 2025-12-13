import { useProtectedRoute } from '@/hooks/useProtectedRoute'
import SellerLayout from '@/layouts/SellerLayout'
import React, { ReactElement } from 'react'

const Orders = () => {

  useProtectedRoute(['SELLER'])

  return (
    <div>
      Orders
    </div>
  )
}

Orders.getLayout = function getLayout(page:ReactElement){
  return <SellerLayout>{page}</SellerLayout>
}

export default Orders
