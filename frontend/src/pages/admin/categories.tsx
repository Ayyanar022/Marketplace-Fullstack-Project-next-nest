import AdminLayout from '@/layouts/AdminLayout'
import React, { ReactElement } from 'react'

const Categories = () => {
  return (
    <div>
      categories
categories
    </div>
  )
}

Categories.getLayout = function getLayout(page:ReactElement){
  return <AdminLayout>{page}</AdminLayout>
}

export default Categories
