import Navbar from "@/components/common/Navbar";
import NavItem from "@/components/common/NavItem";
import Sidebar from "@/components/common/Sidebar";
import { adminNav } from "@/config/NavItemConfig";



interface AdminLayoutProps {
    children : React.ReactNode;
}


const AdminLayout: React.FC<AdminLayoutProps> =({children})=>{
    return(
        <div className="min-h-screen flex bg-bgMain text-textPrimary">
            {/* sidebar */}
            <Sidebar title="Admin Panel" items={adminNav}/>
        
            {/* <aside className="w-64 bg-cardBg border-r border-accent/10 p-4">
                <h2 className="text-lg font-semibold mb-4 text-primary">
                    Admin Panel
                </h2>
            <nav className="flex flex-col gap-3">
               <NavItem href='/admin'  label='Dashboard'/>
               <NavItem href='admin/sellers'  label='sellers'/>
               <NavItem href='/admin/products'  label='Products'/>
               <NavItem href='/admin/categories'  label='Categories'/>
               <NavItem href='/admin/analytics'  label='Analytics'/>
               
            </nav>

            </aside> */}

            {/* Main area */}
            <div className="flex-1 flex flex-col">
                {/* top Navebar */}
                <Navbar />

                {/* page content */}
                <main className="flex-1 p-6 bg-bgMain">
                {children}
                </main>



            </div>

        </div>
    )
}


export default AdminLayout