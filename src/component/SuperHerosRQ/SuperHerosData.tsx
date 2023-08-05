import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query'


export type DataResponse={
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

const AddData = (hero:DataResponse):Promise<DataResponse[]>=>{
    return axios.post("http://localhost:4000/superheros",hero).then(data=>data.data).catch(err=>console.log(err))
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
    const{isLoading,isError,error,refetch,data}= useQuery(['super-hero',id],()=>fetchDataById(id))
    return{isLoading,isError,error,refetch,data}
}

export const AddSuperHero =()=>{
    const queryClient = useQueryClient()
return useMutation(AddData,{
    onSuccess:()=>{
        queryClient.invalidateQueries('super-heros')
    }
})
}
