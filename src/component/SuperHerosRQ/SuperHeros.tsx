
import React, { ChangeEvent, useState } from 'react'
import { AddSuperHero, DataResponse, GetSuperHeros } from './SuperHerosData'
import { Link } from 'react-router-dom'


function SuperHeros() {

    const{mutate} =AddSuperHero()
    const[name,setName] = useState('');
    const[alterGo,setAlterGo] = useState('')

    type ErrorResponse={
        message:string,
    }


    const onSuccess =()=>{
        console.log("hello")

    }

    const onError = ()=>{
        console.log("Error")

    }

    const {isLoading,isError,error,refetch,data}=GetSuperHeros(onSuccess,onError)


    if(isLoading){
        return(
        <h1> Loading..........</h1>
        )}
    if(isError){
        return(<h1>{ String(error)}</h1>)
    }

    const onNameChange =(event:ChangeEvent<HTMLInputElement>)=>{
        setName(event.target.value);
    }
 
    const onAlterGoChange =(event:ChangeEvent<HTMLInputElement>)=>{
        setAlterGo(event.target.value);
    }

    const onAddHandler =()=>{
        const item:DataResponse ={id:Math.random(),name:name,alterEgo:alterGo};
        mutate(item);
    }

  return (
    <div className=' flex flex-col items-center '>
        <div className=' bg-red-400 w-full flex mb-12 flex-row items-center justify-center'>
        <input className=' h-12 w-36 rounded-[20px] m-4' onChange={onNameChange}/>
        <input className=' h-12 w-36 rounded-[20px] m-4' onChange={onAlterGoChange}/>
        </div>
        <button className=' bg-green-600 rounded-[30px] p-4 w-[30%] items-center' onClick={onAddHandler}>Add Item</button>

        { data?.map(item=>{
            return <Link key={item.id} to={`/SuperHeroItem/${item.id}`} className=' cursor-pointer'>{item.name}</Link>
        }
            
        )}

    </div>
  )
}

export default SuperHeros
