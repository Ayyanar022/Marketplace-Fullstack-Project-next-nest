import UserLayout from '@/layouts/UserLayout'
import React, { ReactElement } from 'react'

const Profile = () => {
  return (
    <div>
      profile
profile
    </div>
  )
}


Profile.getLayout = function getLayout(page:ReactElement){
  return <UserLayout>{page}</UserLayout>
}

export default Profile
