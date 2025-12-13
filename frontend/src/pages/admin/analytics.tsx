import { useProtectedRoute } from '@/hooks/useProtectedRoute'
import AdminLayout from '@/layouts/AdminLayout'
import React, { ReactElement } from 'react'

const Analytics = () => {

  useProtectedRoute(['ADMIN'])

  return (
    <div>
      analytics
    </div>
  )
}

Analytics.getLayout = function getLayout(page:ReactElement){
  return <AdminLayout>{page}</AdminLayout>
}

export default Analytics
