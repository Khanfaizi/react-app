import { create } from "apisauce";
    
const apiSauceInstance = create({
    baseURL: process.env.REACT_APP_API_URL,
});

const globalHeaders = {
    headers :{
        "content-type" : "applicaton/json",  
    },
};

const get = (url,params ={}) => apiSauceInstance.get(url,params)

const post = (url,data = {})=> apiSauceInstance.post(url,data, globalHeaders);

const put = (url,data = {})=> apiSauceInstance.put(url,data, globalHeaders);


const patch = (url,data = {})=> apiSauceInstance.patch(url,data, globalHeaders);


const deleteRequest = (url,params = {})=> apiSauceInstance.delete(url,params);

export const apiService = {
    get,
    post,
    put,
    patch,
    delete : deleteRequest,
};