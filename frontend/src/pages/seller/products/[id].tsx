import { deleteImage, deleteProduct, getSellerProductById, updateProduct } from "@/api/productApi";
import ProductImageUpload from "@/components/products/ProductImageUpload";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import SellerLayout from "@/layouts/SellerLayout";
import { Trash2 } from "lucide-react";
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
    const [imageUrl,seImageUrl] = useState<string[]>([])

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
                imageUrl:imageUrl
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
            await deleteProduct(product.id);
            toast.success("Product deleted");
            router.push('/seller/products');
        }catch(e){
            toast.error("Deleted failed");
        }
    }

    const handleCancel = ()=>router.push('/seller/products')

    const handleDeleteImage= async(img:any)=>{
        try{
            console.log("img-----",img)
            await deleteImage(img.id)
            setProduct((prev:any)=>({...prev,images: prev.images?.filter((i:any)=>i.id!==img.id)}))
            // fetchProduct()

        }catch(e){
            console.log(e)
            toast.error("Try again")
        }
    }


    if(loading) return <p>Loading ...</p>
    if(!product) return null

    console.log("product",product)

    return (
        <div className="max-wxl">
            <h1 className="text-2xl font-semibold mb-6">Edit Product</h1>
            <div className="flex flex-col gap-4 max-w-xl">
               
                <input type="text"
                className="border outline-none p-2 rounded"
                    value={product.name}
                    onChange={(e)=>setProduct({...product,name:e.target.value})}
                    
                />

                <input type="text"
                className="border outline-none p-2 rounded"
                    value={product.category.name}
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

                <div className="flex flex-wrap gap-4 ">                    
                    {product && product?.images?.map((img:any)=>(
                        <div key={img.id} className="w-auto max-w-56 h-28 relative">
                            <button onClick={()=>handleDeleteImage(img)}>
                            <Trash2 className="w-7 h-7 text-red-500 hover:text-red-600 cursor-pointer 
                            absolute right-0 top-6 bg-white rounded-full p-1 border border-black/20"     />
                            </button>
                            <img src={img.url} alt=""  className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>

                       <div className='flex flex-wrap overflow-hidden  gap-3'>
                {imageUrl && imageUrl.map((img)=>(
                    <div className='h-28  w-auto'>
                    <img src={img} alt="" className='w-full h-full object-cover' />
                    </div>
                ))}

                </div>

               <div className="flex gap-3 mt-3">
                <button onClick={handleSave}
                 className="bg-primary text-white  hover:shadow
                px-4 py-2 rounded disabled:opacity-60">
                    {saving?"Saving..":"Save"}
                </button>

                <button onClick={handleCancel} className="text-primary border border-black/20 rounded bg-white px-4 py-2 hover:handow ">Cancel</button>
                <button onClick={handleDelete} className="bg-red-500 rounded text-white px-4 py-2 hover:shadow">Delete</button>


               </div>

                <div className='py-5'>
        <ProductImageUpload onUploaded={(url)=>seImageUrl(p=>[...p,url])} />
      </div>

            </div>

        </div>
    )

}

SellerProductDetailPage.getLayout = function getLayout(page:ReactElement){
    return <SellerLayout>{page}</SellerLayout>
}

export default SellerProductDetailPage;