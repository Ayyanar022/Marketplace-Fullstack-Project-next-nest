import UserLayout from '@/layouts/UserLayout'
import React, { ReactElement } from 'react'

const Address = () => {
  return (
    <div>
        address
address
      
    </div>
  )
}

Address.getLayout = function getLayout(page:ReactElement){
  return <UserLayout>{page}</UserLayout>
}

export default Address
