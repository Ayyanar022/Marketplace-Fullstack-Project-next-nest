import AdminLayout from '@/layouts/AdminLayout'
import React, { ReactElement } from 'react'

const Products = () => {
  return (
    <div>
      products
products
    </div>
  )
}

Products.getLayout = function getLayout(page:ReactElement){
  return <AdminLayout>{page}</AdminLayout>
}

export default Products
