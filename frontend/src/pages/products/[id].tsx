import { getProductById } from "@/api/productApi";
import PublicLayout from "@/layouts/PublicLayout";
import { RootState } from "@/features/store";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { addToCart } from "@/api/cartApi";
import Image from "next/image";





function ProductDetailPage(){

    const router = useRouter();
    const {id} = router.query;

    const {isAuthenticated ,user} = useSelector( (state:RootState)=>state.auth);

    const [product,setProduct] = useState<any>(null);
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        if(!id) return;

        const fetchProduct =async ()=>{
            try{

                const data = await getProductById(id as string);
                setProduct(data);
            }catch(e){
            toast.error("Product not found ");
            router.replace('/products')
        }finally{
            setLoading(false)
        }
        }
        fetchProduct()
    },[id,router])

    // cart 
    const handleAddTocart = async ()=>{
        if(!isAuthenticated)return router.push('/login')

        if(user?.role !=='CUSTOMER') return toast.error("Only Customer can add to cart");
        try{
            await addToCart(product.id,1)
            toast.success("Added to cart")
        }catch(e){
            toast.error("Failed to add to cart")
        }
    }

    if(loading){
        return <p className="text-center mt-10">Loading Product...</p>
    }

    if(!product) return null;  // its for safe purpose . if profuct missing  no creash

    
    return(
        <div className="max-w-4xl mx-auto">
            <div className="h-64 bg-gray-100 rounded mb-8 flex justify-center items-center text-gray-400 ">
            <div className="relative w-full h-64 bg-gray-100 rounded mb-6 overflow-hidden">
                <Image
                    src={product.images[0].url}
                    alt="Product Image"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 600px"
                />
                </div>

                {/* <div className="h-64 bg-gray-100 rounded mb-6 flex items-center justify-center overflow-hidden">
                <img
                    src={product.images[0].url}
                    alt="Product Image"
                    className="max-h-full max-w-full object-contain"
                />
                </div> */}

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

            <button onClick={handleAddTocart}
            className="bg-primary text-white px-6 py-2 rounded mt-6"
            >Add to Cart</button>

        </div>
    )

}

ProductDetailPage.getLayout = function getLayout(page:ReactElement){
    return <PublicLayout>{page}</PublicLayout>
}


export default ProductDetailPage;