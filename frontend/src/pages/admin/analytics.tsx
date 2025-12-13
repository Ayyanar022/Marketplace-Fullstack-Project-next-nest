import AdminLayout from '@/layouts/AdminLayout'
import React, { ReactElement } from 'react'

const Analytics = () => {
  return (
    <div>
      analytics
analytics
    </div>
  )
}

Analytics.getLayout = function getLayout(page:ReactElement){
  return <AdminLayout>{page}</AdminLayout>
}

export default Analytics
