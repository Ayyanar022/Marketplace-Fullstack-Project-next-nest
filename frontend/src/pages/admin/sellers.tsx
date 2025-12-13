import AdminLayout from '@/layouts/AdminLayout'
import React, { ReactElement } from 'react'

const Sellers = () => {
  return (
    <div>
      sellers
sellers
    </div>
  )
}

Sellers.getLayout = function getLayout(page:ReactElement){
  return <AdminLayout>{page}</AdminLayout>
}

export default Sellers
