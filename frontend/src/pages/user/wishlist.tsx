import UserLayout from '@/layouts/UserLayout'
import React, { ReactElement } from 'react'

const Wishlist = () => {
  return (
    <div>
      wishlist
wishlist
    </div>
  )
}

Wishlist.getLayout = function getLayout(page:ReactElement){
  return <UserLayout>{page}</UserLayout>
}

export default Wishlist
