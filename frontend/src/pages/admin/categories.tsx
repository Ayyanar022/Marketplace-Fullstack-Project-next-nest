import { useProtectedRoute } from '@/hooks/useProtectedRoute'
import AdminLayout from '@/layouts/AdminLayout'
import React, { ReactElement } from 'react'

const Categories = () => {

  useProtectedRoute(['ADMIN'])

  return (
    <div>
      categories
    </div>
  )
}

Categories.getLayout = function getLayout(page:ReactElement){
  return <AdminLayout>{page}</AdminLayout>
}

export default Categories
