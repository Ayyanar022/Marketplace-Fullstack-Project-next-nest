import AdminLayout from "@/layouts/AdminLayout"
import { ReactElement } from "react"


const AdminDashbordPage = ()=>{
    return(
        <div>
            <h1 className="text-2xl font-semibold">
                Admin dashbord
            </h1>
        </div>
    )
}


AdminDashbordPage.getLayout = function getLayout(page:ReactElement){
    return <AdminLayout>{page}</AdminLayout>
}


export default AdminDashbordPage