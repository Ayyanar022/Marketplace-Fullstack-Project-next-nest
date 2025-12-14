import { useProtectedRoute } from '@/hooks/useProtectedRoute'
import UserLayout from '@/layouts/UserLayout'
import React, { ReactElement } from 'react'

const Address = () => {

  useProtectedRoute(['CUSTOMER']);
  return (
    <div>
        address
    </div>
  )
}

Address.getLayout = function getLayout(page:ReactElement){
  return <UserLayout>{page}</UserLayout>
}

export default Address
