import { useProtectedRoute } from '@/hooks/useProtectedRoute'
import SellerLayout from '@/layouts/SellerLayout'
import React, { ReactElement } from 'react'

const Products = () => {

  useProtectedRoute(['SELLER'])


  return (
    <div>
      Products
    </div>
  )
}

Products.getLayout = function getLayout(page:ReactElement){
  return <SellerLayout>{page}</SellerLayout>
}

export default Products
