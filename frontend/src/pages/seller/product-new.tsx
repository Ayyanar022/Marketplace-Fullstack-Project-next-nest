import { useProtectedRoute } from '@/hooks/useProtectedRoute'
import SellerLayout from '@/layouts/SellerLayout'
import React, { ReactElement } from 'react'

const ProductNew = () => {

  useProtectedRoute(['SELLER'])


  return (
    <div>
      product-new
    </div>
  )
}

ProductNew.getLayout = function getLayout(page:ReactElement){
  return <SellerLayout>{page}</SellerLayout>
}

export default ProductNew
