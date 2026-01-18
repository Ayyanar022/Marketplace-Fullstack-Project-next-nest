import { useProtectedRoute } from '@/hooks/useProtectedRoute'
import SellerLayout from '@/layouts/SellerLayout'
import React, { ReactElement, useEffect, useState } from 'react'
import {Category} from '@/types/category'
import { getCategories } from '@/api/categoryApi'
import toast from 'react-hot-toast'
import { createProduct } from '@/api/productApi'
import { useRouter } from 'next/router'
import ProductImageUpload from '@/components/products/ProductImageUpload'

const ProductNew = () => {

  useProtectedRoute(['SELLER'])
  const router = useRouter()

  const formInitialState = {
    name:"",
    description:"",
    price:"",
    categoryId:"",
    stock:'',
  }


  const [categories ,setCategories] = useState<Category[]>([]);
  const [formData,setFormData] = useState(formInitialState)
  const [loading,setLoadng] = useState(false);
  const [imageUrl,seImageUrl] = useState<string[]>([])


  const handleChange = (e:any)=>{
    const {value,name} = e.target;
    setFormData((prev)=>{
      return(
        {
          ...prev,
          [name]:value
        }
      )
    })
  }


  // to fetch category data
  useEffect(()=>{
    const loadCategories = async ()=>{
      try{
        const data = await getCategories();
        setCategories(data);        
      }catch(e){
        toast.error("Failed to load Categories")
      }
    }

    loadCategories();
  },[])


  const handleSubmitAdd = async (e:React.FormEvent)=>{
    e.preventDefault();
    console.log("formData",formData)

    if(!formData.categoryId || !formData.name || !formData.price
      ||!formData.description ||!formData.stock
    )return toast.error("Please File All Fields");

    setLoadng(true);
    try{
     const res = await createProduct({
      name:formData.name ,
      description:formData.description ,
      categoryId: formData.categoryId,
      price:+formData.price,
      stock:+formData.stock,
      imageUrl :imageUrl,
      })

      console.log("image url ",imageUrl)

      console.log("res---",res)

      toast.success("Product added successfully");
      router.push("/seller/products")
    }catch(e){
      toast.error("Failed to add Product")
    }finally{
      setLoadng(false)
    }
  }

  const handleCalcel = ()=>setFormData(formInitialState)


  return (
    <div className='max-w-xl'>
      <h1 className='text-2xl font-semibold mb-6'>Add Product</h1>

      <form  className='flex flex-col gap-4'>
        <input type="text"
        name='name'
        value={formData.name}
        onChange={handleChange}
        className='outline-none border p-2 rounded'
        placeholder='Product Name' />

<div className='flex gap-x-7'>
        <input type="number"
        name='price'
        value={formData.price}
        onChange={handleChange}
        placeholder='Price'
          className='outline-none border p-2 rounded flex-1'
         />
             <input type="number"
        name='stock'
        value={formData.stock}
        onChange={handleChange}
        placeholder='Stock'
          className='outline-none border p-2 rounded flex-1'
         />
         </div>

         <select name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
            className='outline-none border p-2 rounded'
         >
          <option value="" hidden>Select</option>
         {categories.map((c)=>(
          <option key={c.id} value={c.id}>{c.name}</option>
         ))}
         </select>

         <textarea          
          placeholder='Description'
          name='description'
          value={formData.description}
          onChange={handleChange}
            className='outline-none border p-2 rounded'
         />

         {/* <input           
          placeholder='Image Url'
          name='imageUrl'
          value={formData.imageUrl}
          onChange={handleChange}
            className='outline-none border p-2 rounded'
         /> */}

         <div className='flex flex-wrap overflow-hidden  gap-3'>
          {imageUrl && imageUrl.map((img)=>(
            <div className='h-28  w-auto'>
              <img src={img} alt="" className='w-full h-full object-cover' />
            </div>
          ))}

         </div>
         
          <div className='flex gap-x-7'>
          <button
          className='bg-primary text-white py-2 flex-1 rounded disabled:opacity-60 '
          disabled={loading}
          onClick={handleSubmitAdd}
          > {loading ? "Saving..":"Add Product"}</button>
          <button onClick={handleCalcel} disabled={loading} className='bg-white text-primary py-2 border
           flex-1 rounded disabled:opacity-60 hover:shadow-md transition' >  Clear  </button>
          </div>
      </form>

      <div className='py-5'>
        <ProductImageUpload onUploaded={(url)=>seImageUrl(p=>[...p,url])} />
      </div>

     
    </div>
  )
}

ProductNew.getLayout = function getLayout(page:ReactElement){
  return <SellerLayout>{page}</SellerLayout>
}

export default ProductNew
