import { useProtectedRoute } from '@/hooks/useProtectedRoute'
import AdminLayout from '@/layouts/AdminLayout'
import React, { ReactElement } from 'react'

const Products = () => {

  useProtectedRoute(['ADMIN'])

  return (
    <div>
      products
    </div>
  )
}

Products.getLayout = function getLayout(page:ReactElement){
  return <AdminLayout>{page}</AdminLayout>
}

export default Products
