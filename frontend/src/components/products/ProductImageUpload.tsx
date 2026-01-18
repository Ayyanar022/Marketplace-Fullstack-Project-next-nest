import React, { use, useRef, useState } from 'react'
import img from '../../assert/img.png'
import axios from 'axios'
import api from '@/api/axios'

type Props = {
    onUploaded:(url:string)=>void
}

const ProductImageUpload = ({onUploaded}:Props) => {
    const [preview,setPreview] = useState<string | null>(null)
    const [file,setFile] = useState<File |null>(null)
    const [loading,setLoading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const onSelect = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const f = e.target.files?.[0];
        if(!f){
            setPreview('');
            setFile(null);
            return
        };

        setPreview(URL.createObjectURL(f))
        setFile(f)
    }


    const uploadImage = async ()=>{
        if(!file) return;

        const form = new FormData();
        form.append('image',file);

        setLoading(true);
        const res = await api.post("/products/add-image-upload",form)
        setLoading(false)
        setFile(null);
        setPreview('')

        if(fileInputRef.current){
            fileInputRef.current.value = ''; // to clear input feuld
        }
        onUploaded(res.data.data.url)
    }

  return (
    <div>
        {preview && (
            <img 
            src={preview}
            className='h-28  w-auto py-2 object-cover'
            />
        )}

        <div className=' flex  gap-4 items-center mt-3'>        
        <input ref={fileInputRef} type="file" accept='image/*' className='border border-slate-200 shadow-sm p-3'  onChange={onSelect} />


        <button onClick={uploadImage} className=' bg-white border shadow-lg px-3 py-2 mt-3 
        rounded-lg '>
            {loading ? 'Uploading..':"Upload Image"}
        </button>
      </div>
    </div>
  )
}

export default ProductImageUpload
