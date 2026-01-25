import { dashbordCount } from "@/api/adminApi"
import { useProtectedRoute } from "@/hooks/useProtectedRoute"
import AdminLayout from "@/layouts/AdminLayout"
import { ReactElement, useEffect, useState } from "react"


const AdminDashbordPage = ()=>{

    useProtectedRoute(['ADMIN'])

    const [count,setCount]=useState({
        users:"",
        sellers:"",
        products:"",
        orders:"",
        PACKED:"",
        CANCELLED:"",
        SHIPPED:"",
    })

    useEffect(()=>{
        const fetchCount = async()=>{
            try{
                const res:any =await dashbordCount();
                setCount((p:any)=>({
                            ...p,
                          users:res.users,
                        sellers:res.sellers,
                        products:res.products,
                        orders:res.orders,
                        PACKED:res.orderStatus.PACKED,
                        CANCELLED:res.orderStatus.CANCELLED,
                        SHIPPED:res.orderStatus.SHIPPED,

                }))

            }catch(e){
            console.log("error dashbord",e)
            }
        }
        fetchCount();
    },[])


    return(
        <div>
            <h1 className="text-2xl font-semibold">
                Admin dashbord
            </h1>

            


            <section className="mt-5 flex flex-col flex-wrap space-y-10">
                                <section className="flex flex-wrap gap-7 bg-slate-200/40 p-6 rounded-lg shadow-md">             

                <div className="p-4 border border-slate-300 rounded-md shadow-md w-fit flex gap-3 ">
                   <span className="text-textSecondary"> Total users</span> <span className="">{count?.users}</span>
                </div>    <div className="p-4 border border-slate-300 rounded-md shadow-md w-fit flex gap-3  ">
                   <span className="text-textSecondary"> Total sellers</span> <span className="">{count?.sellers}</span>
                </div>    <div className="p-4 border border-slate-300 rounded-md shadow-md w-fit flex gap-3  ">
                   <span className="text-textSecondary"> Total products</span> <span className="">{count?.products}</span>
                </div>    <div className="p-4 border border-slate-300 rounded-md shadow-md w-fit flex gap-3  ">
                   <span className="text-textSecondary"> Total orders</span> <span className="">{count?.orders}</span>
                </div>  
            </section>
               
               <div>              
               <h3 className="text-lg py-2">Orders by Satus </h3>             
               <section className=" flex flex-wrap gap-7 bg-slate-200/40 p-6 rounded-lg shadow-md">   
                  <div className="p-4 border border-slate-300 rounded-md shadow-md w-fit flex gap-3  ">
                   <span className="text-textSecondary"> Cancelled</span> <span className="">{count.CANCELLED}</span>
                 </div>
                  <div className="p-4 border border-slate-300 rounded-md shadow-md w-fit flex gap-3  ">
                   <span className="text-textSecondary"> Packed</span> <span className="">{count.PACKED}</span>
                 </div>
                  <div className="p-4 border border-slate-300 rounded-md shadow-md w-fit flex gap-3  ">
                   <span className="text-textSecondary"> Shipped</span> <span className="">{count.SHIPPED}</span>
                 </div>
               </section>
                </div>
            </section>
        </div>
    )
}


AdminDashbordPage.getLayout = function getLayout(page:ReactElement){
    return <AdminLayout>{page}</AdminLayout>
}


export default AdminDashbordPage