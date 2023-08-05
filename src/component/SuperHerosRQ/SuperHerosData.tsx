import axios from 'axios';
import { useQuery } from 'react-query'


type DataResponse={
    id:number,
    name:string,
    alterEgo:string
}


const fetchDataById= (id:number):Promise<DataResponse>=>{
    
    return axios.get(`http://localhost:4000/superheros/${id}`).then(data=>data.data).catch(err=>console.log(err))
}

const fetchData = ():Promise<DataResponse[]>=>{
    return axios.get("http://localhost:4000/superheros").then(data=>data.data).catch(err=>console.log(err))
}

export const GetSuperHeros =(onSuccess:()=>void,onError:()=>void)=>{

    const{isLoading,isError,error,refetch,data}= useQuery('super-heros',fetchData,{
        onSuccess,
        onError,
        select:(data:DataResponse[])=>{
            const SuperHeroNames= data.map(item=> {return {name:item.name,id:item.id}});
            return SuperHeroNames;
        }
    })
    return{isLoading,isError,error,refetch,data}
}

export const GetSuperHeroById =(id:number)=>{
    const{isLoading,isError,error,refetch,data}= useQuery(['super-heros',id],()=>fetchDataById(id))
    return{isLoading,isError,error,refetch,data}
}
