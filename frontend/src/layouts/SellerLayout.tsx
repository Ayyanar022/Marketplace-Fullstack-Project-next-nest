import Navbar from "@/components/common/Navbar";
import NavItem from "@/components/common/NavItem";
import Sidebar from "@/components/common/Sidebar";
import { sellerNav } from "@/config/NavItemConfig";


interface SellerLayoutProps {
    children : React.ReactNode;
}


const SellerLayout : React.FC<SellerLayoutProps > = ({children})=>{
    return(
        <div className="min-h-screen flex bg-bgMain text-textPrimary">
            {/* sidebar */}
            <Sidebar title="Seller Panel" items={sellerNav} />
          
            {/* <aside className=" w-64 bg-cardBg border-r border-accent/10 p-4">
                <h2 className="text-lg font-semibold mb-4 text-primary">
                    Seller Panel
                </h2>

                <nav className="flex flex-col gap-3">
                  <NavItem href='/seller' label='DashBoard'/>
                  <NavItem href='/seller/products' label='Products'/>
                  <NavItem href='/seller/orders' label='Orders'/>
                  <NavItem href='/seller/product-new' label='Add Product'/>
                                  
                </nav>
            </aside> */}

            {/* Main Area */}
            <div className="flex-1 flex flex-col">
                {/* top navebar */}
                <Navbar />

                {/* page content */}
                <main className="flex-1 p-4 bg-bgMain">
                    {children}
                </main>

            </div>
            
        </div>
    )
}


export default SellerLayout;