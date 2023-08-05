
import React, { useState } from 'react'
import { GetSuperHeros } from './SuperHerosData'
import { Link } from 'react-router-dom'


function SuperHeros() {

    

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

  return (
    <div className=' flex flex-col'>

        { data?.map(item=>{
            return <Link key={item.id} to={`/SuperHeroItem/${item.id}`} className=' cursor-pointer'>{item.name}</Link>
        }
            
        )}

    </div>
  )
}

export default SuperHeros
