import Footer from '@/components/common/Footer'
import Navbar from '@/components/common/Navbar'
import React from 'react'

interface PublicLayoutProps{
    children:React.ReactNode
}

const PublicLayout:React.FC<PublicLayoutProps> = ({children}) => {
  return (
    <div className='min-h-screen flex flex-col bg-bgMain text-textPrimary'>
        <Navbar />

    {/* page content */}
        <main className='flex-1 w-full p-4'>
        {children}
        </main>      

        <Footer />
    </div>
  )
}

export default PublicLayout
