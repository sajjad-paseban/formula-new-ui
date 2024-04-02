import axios from "axios";
import { base_api_url } from "@/helpers/Url";

export const getAll = async () =>{
    try{
        const result = await axios.get(base_api_url('formula/code_floortype'), {

        }).then(res => res);

        return result;
    }catch(res: any){
        return res.response
    }   
}