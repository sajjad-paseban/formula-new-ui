import { base_api_url } from "@/helpers/Url"
import axios from "axios"

export const getAll = async () =>{
    try{
        const result = await axios.get(base_api_url('formula/earning'), {

        }).then(res => res);

        return result;
    }catch(res: any){
        return res.response
    }   
}

export const getOne = async (id: any) =>{
    try{
        const result = await axios.get(base_api_url('formula/earning/' + id)).then(res => res);

        return result;
    }catch(res: any){
        return res.response
    }   
}

export const store = async (data: any) => {
    try{

        const result = await axios.post(base_api_url('formula/earning'),data, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
                "X-Requested-With": "XMLHttpRequest",
            }
        }).then(res => res)

        return result

    }catch(res: any){
        return res.response
    }
}

export const destroy = async (data: any) => {
    try{

        const result = await axios.delete(base_api_url('formula/earning/'+data)).then(res => res)

        return result

    }catch(res: any){
        return res.response
    }
}

export const edit = async (data: any, id: any) => {
    try{

        const result = await axios.put(base_api_url('formula/earning/'+id),data, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
                "X-Requested-With": "XMLHttpRequest",
            }
        }).then(res => res)

        return result

    }catch(res: any){
        return res.response
    }
}