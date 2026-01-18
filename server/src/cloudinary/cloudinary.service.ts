import { Injectable } from "@nestjs/common";
import { rejects } from "assert";
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { resolve } from "path";
import { Readable } from "stream";



@Injectable()
export class CloudinaryService{
    constructor(){
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key : process.env.CLOUDINARY_API_KEY,
            api_secret:process.env.CLOUDINARY_API_SECRET,
        })
    }

//     uploadImage(buffer: Buffer) {
//   return new Promise((resolve, reject) => {
//     const uploadStream = cloudinary.uploader.upload_stream(
//       { folder: 'products' },
//       (error, result) => {
//         if (error) return reject(error);
//         resolve(result);
//       },
//     );

//     Readable.from(buffer).pipe(uploadStream);
//   });
// }

async uploadImage(buffer:Buffer):Promise<UploadApiResponse>{
    return new Promise((resolve,reject) =>{
        const upload =  cloudinary.uploader.upload_stream(
            { folder: 'marketplace/products'},
            (error,result)=>{
                if(error) reject(error);
                resolve(result as UploadApiResponse)
            })
        

        Readable.from(buffer).pipe(upload)
    });
}

    // async uploadImage(filePath : string){
    //     return await cloudinary.uploader.upload(filePath,{
    //         folder: 'marketplace/products',
    //     })
    // }

    async deleteImage(publicId :string){
        const id = publicId.split('/').slice(1).join('/')
        console.log("publicId",publicId)
        console.log("id",id)
        return await cloudinary.uploader.destroy(id)
    }

    
}