import axios from "axios";
import { API } from '@/API';

//List Database
export const getFunction = async () => {
    const response = await fetch(API + "/customConfig",{
        method: 'GET'
    });
    return await response.json();
}
export function addFunction(data){
    return axios.post(API + "/customConfig",data)
}
export async function detailFunction(link){
    const response = await axios.get(API + "/customConfig/" + link)
    return await response.data
}
export function editFunction(data,link){
    return axios.put(API + "/customConfig/" + link,data)
}