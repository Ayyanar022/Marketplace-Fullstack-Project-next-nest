import { deleteProduct, getSellerProductById, updateProduct } from "@/api/productApi";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import SellerLayout from "@/layouts/SellerLayout";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";





function SellerProductDetailPage(){
    useProtectedRoute(['SELLER'])

    const router = useRouter();
    const {id} = router.query;

    const [product,setProduct] = useState<any>(null);
    const [loading,setLoading] = useState(true);
    const [saving,setSaving] = useState(false);

    useEffect(()=>{
        if(!id) return;

        const fetchProduct =async ()=>{
            try{
                const data = await getSellerProductById(id as string)
                setProduct(data)
            }catch(e){
                toast.error("Product not found");
                router.replace('seller/products')
            }finally{
                setLoading(false)
            }
        }
        fetchProduct()
    },[id,router])


    const handleSave = async ()=>{
        setSaving(true);
        try{
           const res =   await updateProduct(product.id ,{
                name:product.name,
                description:product.description,
                price:+product.price,
                stock:product.stock,
            })
            console.log("res---kk",res)
            toast.success("Prodcut Updated")
             router.push('/seller/products')
        }catch(e:any){            
            toast.error( "Filed Product update");
        }finally{
            setSaving(false)
        }
    }

    
    const handleDelete = async()=>{
        try{
            await deleteProduct(product.id)
            toast.success("Product deleted");
            router.push('/seller/products')

        }catch(e){
            toast.error("Deleted failed")
        }
    }

    const handleCancel = ()=>router.push('/seller/products')


    if(loading) return <p>Loading ...</p>
    if(!product) return null


    return (
        <div className="max-wxl">
            <h1 className="text-2xl font-semibold mb-6">Edit Product</h1>
            <div className="flex flex-col gap-4 max-w-xl">
                <input type="text"
                className="border outline-none p-2 rounded"
                    value={product.name}
                    onChange={(e)=>setProduct({...product,name:e.target.value})}
                />

                <textarea 
                className="outline-none border p-2 rounded"
                value={product.description ||""}
                onChange={(e)=>setProduct({...product,description:e.target.value})}
                />

                <input type="number" 
                className="outline-none border p-2 rounded"
                value={product.price}
                onChange={(e)=>setProduct({...product,price:e.target.value})}
                />
                <input type="number" 
                className="outline-none border p-2 rounded"
                value={product.stock}
                onChange={(e)=>setProduct({...product,stock:e.target.value})}
                />

               <div className="flex gap-3 mt-3">
                <button onClick={handleSave}
                 className="bg-primary text-white  hover:shadow
                px-4 py-2 rounded disabled:opacity-60">
                    {saving?"Saving..":"Save"}
                </button>

                <button onClick={handleCancel} className="text-primary border border-black/20 rounded bg-white px-4 py-2 hover:handow ">Cancel</button>
                <button onClick={handleDelete} className="bg-red-500 rounded text-white px-4 py-2 hover:shadow">Delete</button>


               </div>

            </div>

        </div>
    )

}

SellerProductDetailPage.getLayout = function getLayout(page:ReactElement){
    return <SellerLayout>{page}</SellerLayout>
}

export default SellerProductDetailPage;