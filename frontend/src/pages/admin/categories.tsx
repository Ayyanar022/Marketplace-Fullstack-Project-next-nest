import { createCategory, getCategories } from '@/api/categoryApi'
import { useProtectedRoute } from '@/hooks/useProtectedRoute'
import AdminLayout from '@/layouts/AdminLayout'
import { Category } from '@/types/category'
import React, { ReactElement, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const Categories = () => {
useProtectedRoute(['ADMIN'])

const [categories, setCategories] = useState<Category[]>([]);
const [name,setName] = useState("");
const [loading, setLoading] = useState(false);

const fetchCategories = async ()=>{
  try{
    const data = await getCategories()
    setCategories(data)

  }catch(e){
    toast.error("Failed to get Categories")
  }
}

useEffect(()=>{
  fetchCategories()
},[])

const addCategory = async(e:React.FormEvent)=>{
  e.preventDefault();
  if(!name.trim()) return;

  setLoading(true);
  try{
    const newCategory = await createCategory(name);
    setCategories((p=>[...p,newCategory]))
    setName("");
    toast.success("Category added")
  }catch(e){
    toast.error("Category alredy exist")
  }finally{
    setLoading(false)
  }
}


  return (
    <div className='max-w-xl'>
      <h1 className='text-2xl font-semibold mb-6'>Categories</h1>

      <form onSubmit={addCategory}  className='flex gap-3 mb-6'>
        <input type="text"
        value={name}
        placeholder='Category name'
        className='outline-none border p-2 flex-1'
        onChange={(e)=>setName(e.target.value)}
        />

        <button type='submit' 
        className='bg-primary text-white px-4 rounded disabled:opacity-60'
        >Add</button>
      </form>

      <ul className='space-y-2 mt-2'>
        {
          categories.map((cat)=>(
            <li key={cat.id} className='bg-cardBg p-3 rounded text-sm'>
              {cat.name}
            </li>
          ))
        }

      </ul>
    </div>
  )
}

Categories.getLayout = function getLayout(page:ReactElement){
  return <AdminLayout>{page}</AdminLayout>
}

export default Categories
