import SellerLayout from '@/layouts/SellerLayout'
import React, { ReactElement } from 'react'

const Products = () => {
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
