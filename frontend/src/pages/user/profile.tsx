import { loginSuccess } from '@/features/auth/authSlice'
import { useProtectedRoute } from '@/hooks/useProtectedRoute'
import UserLayout from '@/layouts/UserLayout'
import { RootState } from '@reduxjs/toolkit/query'
import React, { ReactElement, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Profile = () => {

  useProtectedRoute(["CUSTOMER"]);


  return (
    <div>
      profile
    </div>
  )
}


Profile.getLayout = function getLayout(page:ReactElement){
  return <UserLayout>{page}</UserLayout>
}

export default Profile
