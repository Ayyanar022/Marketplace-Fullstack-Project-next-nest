import { useProtectedRoute } from '@/hooks/useProtectedRoute'
import AdminLayout from '@/layouts/AdminLayout'
import React, { ReactElement } from 'react'

const Sellers = () => {

  useProtectedRoute(['ADMIN'])

  return (
    <div>
      sellers
    </div>
  )
}

Sellers.getLayout = function getLayout(page:ReactElement){
  return <AdminLayout>{page}</AdminLayout>
}

export default Sellers
