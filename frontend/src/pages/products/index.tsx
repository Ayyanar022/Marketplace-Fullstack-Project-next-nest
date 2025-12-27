import { getProducts } from "@/api/productApi";
import PublicLayout from "@/layouts/PublicLayout";
import Link from "next/link";
import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";



function ProductsPage(){

    const [products,setProducts] = useState<any[]>([]);
    const [loading , setLoading] = useState(false)

    useEffect(()=>{
        const fetchProducts = async ()=>{
            try{
                const data = await getProducts()
                console.log("data----product",data)
                setProducts(data)

            }catch(e){
                toast.error("Failed to load data")
            }finally{
                setLoading(false)
            }
        }
        fetchProducts()
    },[])

    if(loading){
        return  <p className="text-center mt-10">Loading Products...</p>
    }


    return(
        <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-semibold mb-6">Products</h1>
           {products.length===0?(
            <p className="text-textSecondary">No Products Avilable</p>
           ):(
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product)=>(
                    <Link key={product.id} 
                    href={`/products/${product.id}`}
                    className="block bg-cardBg border rounded p-4 hover:shadow "
                    >
                        <div className="h-40 bg-gray-100 rounded mb-3 flex items-center justify-center text-sm text-gray-400">
                            Image
                        </div>

                        <h2 className="font-medium">{product.name}</h2>
                        <p className="text-sm text-textSecondary line-clamp-2">  {product.description}  </p>
                        <p className="mt-2 font-semibold text-primary">₹{product.price}</p>
                    </Link>
                ))}
            </div>
           )}
           
        </div>
    )
}


ProductsPage.getLayout = function getLayout(page:ReactElement){
    return <PublicLayout>{page}</PublicLayout>
}


export default ProductsPage;