// import Footer from '@/components/common/Footer'
// import Navbar from '@/components/common/Navbar'
// import React from 'react'

// interface UserLayoutProps {
//   children:React.ReactNode
// }

// const UserLayout:React.FC<UserLayoutProps> = ({children}) => {
//   return (
//     <div className='min-h-screen flex flex-col bg-bgMain text-primary'>
//      <Navbar />

// {/* {Body} */}
// <div className='flex flex-1'>
//   <aside className='w-64 bg-cardBg '>
//    <span>test</span>
//   </aside>

//   {/* page content */}
//   <main className='flex-1 p-6 bg-bgMain'>
//     {children}
//   </main>

//   <Footer />

// </div>


//     </div>
//   )
// }

// export default UserLayout


import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import NavItem from "@/components/common/NavItem";
import Sidebar from "@/components/common/Sidebar";
import { userNav } from "@/config/NavItemConfig";
import React from "react";

interface UserLayoutProps {
  children: React.ReactNode;
}

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-bgMain text-textPrimary">
      <Navbar />

      {/* Body */}
      <div className="flex flex-1">
        {/* Sidebar */}
      <Sidebar title="MY Account" items={userNav}/>
        {/* <aside className="w-64 bg-cardBg border-r border-accent/10 p-4">
         <nav className="flex flex-col gap-3">
            <span className="font-semibold text-textPrimary">
              MY Account
            </span>
         
         <NavItem href='/user/profile' label='Profile'/>
         <NavItem href='/user/orders' label='Profile'/>
         <NavItem href='/user/wishlist' label='WishList'/>
         <NavItem href='/user/address' label='Address'/>

    </nav>
        </aside> */}
        

        {/* Page content */}
        <main className="flex-1 p-6 bg-bgMain">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default UserLayout;
