import { getProductById } from "@/api/productApi";
import PublicLayout from "@/layouts/PublicLayout";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";





function ProductDetailPage(){

    const router = useRouter();
    const {id} = router.query;

    const [product,setProduct] = useState<any>(null);
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        if(!id) return;

        const fetchProduct =async ()=>{
            try{

                const data = await getProductById(id as string);
                setProduct(data);
                console.log("data---",data)
            }catch(e){
            toast.error("Product not found ");
            router.replace('/products')
        }finally{
            setLoading(false)
        }
        }
        fetchProduct()
    },[id,router])

    if(loading){
        return <p className="text-center mt-10">Loading Product...</p>
    }

    if(!product) return null;  // its for safe purpose . if profuct missing  no creash

    
    return(
        <div className="max-w-4xl mx-auto">
            <div className="h-64 bg-gray-100 rounded mb-6 felx justify-center items-center text-gray-400">
                Image
            </div>
            <h1 className="text-2xl font-semibold mb-2"> {product.name}</h1>
            <p className="text-xl font-bold text-primary mb-4">
                ₹{product.price}
            </p>

            {product.description && (
                <p className="mb-4 text-textSecondary">
                    {product.description}
                </p>
            )}

            {product.category && (
                <p className="text-sm text-textSecondary">
                    Category:{product.category.name}
                </p>
            )}

            {product.seller && 
                <p className="text-sm text-textSecondary">
                    Seller : {product.seller.name}
                </p>
            }

        </div>
    )

}

ProductDetailPage.getLayout = function getLayout(page:ReactElement){
    return <PublicLayout>{page}</PublicLayout>
}


export default ProductDetailPage;