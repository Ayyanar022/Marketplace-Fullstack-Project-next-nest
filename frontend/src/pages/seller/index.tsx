import SellerLayout from '@/layouts/SellerLayout'
import  { ReactElement } from 'react'

const SellerHomePage = () => {
  return (
    <div>
      <h1 className='text-2xl font-semibold'> Dashboard Page (Layout Test)</h1>
      <p className='p-2'>
          If you can see sidebar, navbar, and footer — layout works.
      </p>
    </div>
  )
}

SellerHomePage.getLayout = function getLayout(page:ReactElement){
    return <SellerLayout>{page}</SellerLayout>
}

export default SellerHomePage;
