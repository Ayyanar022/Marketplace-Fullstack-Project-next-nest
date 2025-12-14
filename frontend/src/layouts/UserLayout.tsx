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
