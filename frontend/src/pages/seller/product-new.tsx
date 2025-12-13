import SellerLayout from '@/layouts/SellerLayout'
import React, { ReactElement } from 'react'

const ProductNew = () => {
  return (
    <div>
      product-new
product-new
    </div>
  )
}

ProductNew.getLayout = function getLayout(page:ReactElement){
  return <SellerLayout>{page}</SellerLayout>
}

export default ProductNew
