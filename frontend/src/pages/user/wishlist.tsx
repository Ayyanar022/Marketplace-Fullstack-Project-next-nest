import { useProtectedRoute } from '@/hooks/useProtectedRoute'
import UserLayout from '@/layouts/UserLayout'
import React, { ReactElement } from 'react'

const Wishlist = () => {

  useProtectedRoute(['USER']);

  return (
    <div>
      wishlist
    </div>
  )
}

Wishlist.getLayout = function getLayout(page:ReactElement){
  return <UserLayout>{page}</UserLayout>
}

export default Wishlist
