import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL;
console.log("API_BASE:", API_BASE);

export const loginApi = async(email:string ,password:string)=>{
    const res = await axios.post(`${API_BASE}/auth/login`,{
        email,
        password,
    })
    return res.data
}


export const signupApi = async(
    email:string,
    password:string,
    name:string,
)=>{
    const  res = await axios.post(`${API_BASE}/auth/signup`,{
        email,
        password,
        name
    })

    return res.data
}