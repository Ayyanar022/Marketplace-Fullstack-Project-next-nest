import {  dashbordCounts } from '@/api/sellerApi';
import { useProtectedRoute } from '@/hooks/useProtectedRoute'
import SellerLayout from '@/layouts/SellerLayout'
import  { ReactElement, useEffect, useState } from 'react'

const SellerHomePage = () => {
  useProtectedRoute(['SELLER']);

//   lowStockcountProduct
// : 
// [{…}]
// orderBysatusC
// : 
// {PACKED: 1, CANCELLED: 11, SHIPPED: 5}
// productcount
// : 
// 9
// productcount
// : 
// 2

  // productcount,
  //           orderItemCount,
  //           orderBysatusC,
  //           lowStockcountProduct,

  const [ data,setData] = useState({
    productcount :'',
    orderItemCount:'',
    lowStockcountProduct:[],
    PACKED:'',
    CANCELLED:'',
    SHIPPED:'',
  })

  useEffect(()=>{
    const fetchSellerDashbordData =  async ()=>{
      try{
        const res = await dashbordCounts()
        console.log("res 99",res)
        setData({
          productcount : res.productcount,
          orderItemCount:res.orderItemCount,
          lowStockcountProduct:res.lowStockcountProduct,
          PACKED:res.orderBysatusC?.PACKED,
          CANCELLED:res.orderBysatusC?.CANCELLED,
          SHIPPED:res.orderBysatusC?.SHIPPED,
        })

      }catch(e){

      }
    } 

    fetchSellerDashbordData()

  },[])



//   Total products
// Total orders
// Orders by status
// Low-stock products (count + list)

let count =1;

  return (
    <div>
      <h1 className='text-2xl font-semibold'> Dashboard</h1>

    <div className='mt-5 space-y-6'>
      <section className='rounded-md flex gap-7 p-6 bg-slate-300/20'>
        <div className='rounded-md border border-slate-300 p-3 px-4 text-textSecondary'>Total Product {data?.productcount}</div>
        <div className='rounded-md border border-slate-300 p-3 px-4 text-textSecondary'>Total Orders {data?.orderItemCount} </div>
      </section>

        <section className='rounded-md space-y-4 p-6 bg-slate-300/20'>
        <p>Counts based on status</p>
        <div className='flex gap-7'>

        <div className='rounded-md border border-slate-300 p-3 px-4 text-textSecondary'>Total CANCELLED {data.CANCELLED} </div>
        <div className='rounded-md border border-slate-300 p-3 px-4 text-textSecondary'>Total SHIPPED {data.SHIPPED} </div>
        <div className='rounded-md border border-slate-300 p-3 px-4 text-textSecondary'>Total PACKED {data.PACKED}  </div>
        </div>

      </section>
      <section className='py-3 pb-10'>
        <p>Low stock products</p>
        <div className='w-full p-3'>
          <table className='table-fixed w-full'>
            <thead>
            <tr className='w-full  bg-green-100'>
              <th className='px-4 py-2 w-1/12 '>NO</th>
              <th className='px-4 py-2 text-wrap'>Name </th>
              <th className=' px-4 py-2 w-1/5'> Category</th>
              <th className='px-4 py-2 w-1/3'>ID</th>
              <th className='px-4 py-2 w-1/12'>Qty</th>              
            </tr>
            </thead>

            <tbody>              
            {
              data?.lowStockcountProduct?.map((p:any)=>(
                <tr className='hover:bg-slate-100' key={p}>
              <td className='px-4 py-2 w-1/12 text-center '> {count++}</td>
              <td className='px-4 py-2 w-1/6 text-center text-sm'>{p?.name} </td>
              <td className='px-4 py-2 w-1/5 text-center text-xs'> {p?.category?.name}</td>
              <td className='px-4 py-2 w-1/3 text-center text-xs'>{p?.id}</td>
              <td className='px-4 py-2 w-1/12 text-center'>{p?.stock}</td>              
            </tr>
              ))
            }
            </tbody>

          </table>

        </div>
      </section>
    </div>
        
  
    </div>
  )
}

SellerHomePage.getLayout = function getLayout(page:ReactElement){
    return <SellerLayout>{page}</SellerLayout>
}

export default SellerHomePage;
