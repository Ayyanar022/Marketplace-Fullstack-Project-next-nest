import { createCategory, editcategory, getCategories } from '@/api/categoryApi'
import { useProtectedRoute } from '@/hooks/useProtectedRoute'
import AdminLayout from '@/layouts/AdminLayout'
import { Category } from '@/types/category'
import { Pencil, Trash2 } from 'lucide-react'
import React, { ReactElement, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const Categories = () => {
useProtectedRoute(['ADMIN'])

const [categories, setCategories] = useState<Category[]>([]);
const [name,setName] = useState("");
const [editData,setEditData] = useState({editName:"", editId:""})
const [loading, setLoading] = useState(false);
const [show , setSow] = useState(false)


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

// update 
  const handleUpdate = async()=>{ 
    try{
      const res = await editcategory(editData.editId,editData.editName)
      fetchCategories()
      setSow(false)
      toast.success("Updated..")

    }catch(e){

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
            <li key={cat.id} className='bg-cardBg p-3 rounded text-sm 
             flex justify-between'>
           <span>  {cat.name}</span>  
           <div className='flex gap-10'>
           <button onClick={()=>{
            setSow(p=>!p);
            setEditData({editName:cat.name, editId:cat.id})
           }}> <Pencil className='text-green-500  w-4 h-4 cursor-pointer' /> </button>
           <button> <Trash2  className='text-red-400 w-4 h-4 cursor-pointer '/> </button>
           </div>
            </li>
          ))
        }

      </ul>

      {show &&

      <div   className='fixed inset-0 flex justify-center items-center bg-slate-300/60'>
        <div className='w-2/5   p-10 pt-16 rounded-md bg-white flex flex-col gap-6 border border-textSecondary/20'>
        <input type="text" onChange={(e)=>setEditData( p=>({...p ,editName:e.target.value} ))} value={editData.editName}  className='outline-none  border border-textSecondary/20 p-2 rounded-md shadow-sm'/>
          <div className='flex gap-5 justify-end'>
            <button onClick={()=>setSow(false)} className='p-2 px-3 border border-textSecondary/50 shadow-lg rounded-lg'>Cancel</button>
            <button onClick={handleUpdate} className='p-2 px-3 border border-textSecondary/50 bg-primary text-white shadow-lg rounded-lg'>Update</button>
          </div>

        </div>

      </div>
       }
    </div>
  )
}

Categories.getLayout = function getLayout(page:ReactElement){
  return <AdminLayout>{page}</AdminLayout>
}

export default Categories
