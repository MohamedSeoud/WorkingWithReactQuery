import React from 'react'
import { GetSuperHeroById } from './SuperHerosData'
import { useParams } from 'react-router-dom'



function SuperHeroItem() {

    const {heroId} = useParams()

    const {isLoading,isError,error,refetch,data} = GetSuperHeroById(Number(heroId))

    if(isLoading){
        return(<h1>Loading............</h1>)
    }
  return (
    <div>
        {data?.name}
      
    </div>
  )
}



export default SuperHeroItem
