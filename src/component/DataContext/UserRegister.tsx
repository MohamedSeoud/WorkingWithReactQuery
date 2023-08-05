import React, { ChangeEvent, useState } from 'react'
import { useRgister } from './Test'

function UserRegister() {
    const { token , Login, Logout} = useRgister();
    const[tokenInput,setToken] = useState('')

    const constOnChangeHandler =(event:ChangeEvent<HTMLInputElement>)=>{
        setToken(event.target.value)
    }


  return (
    <div>
        {token}
        <input onChange={constOnChangeHandler}/>
        <button onClick={()=>Login(tokenInput)}>Login</button>
        <button onClick={Logout}>Logout</button>
    </div>
  )
}

export default UserRegister
