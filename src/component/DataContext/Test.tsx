import { ReactElement, createContext, useCallback, useContext, useReducer } from "react";

type RegisterStates ={
token:string
}
export const initState = {
    userState:false,
    token:'' as string 
}

type UserState ={
    userState: boolean;
    token: string;
}
export enum USER_ACTION_TYPE{
    LOGIN,
    LOGOUT
}

type ReducerAction ={
type:USER_ACTION_TYPE,
payload?:RegisterStates
}

const reducer =(state:UserState ,action:ReducerAction):UserState=>{

    switch(action.type){
        case USER_ACTION_TYPE.LOGIN:
            return{...state,token:action.payload?.token??''}
        
        case USER_ACTION_TYPE.LOGOUT:
            return{...state,token:action.payload?.token??''}
    }
}

const UserStateReducer =(initState:UserState)=>{
    const [state,dispatch] = useReducer(reducer,initState)

    const Login = useCallback( (token:string)=>{
        dispatch({type:USER_ACTION_TYPE.LOGIN,payload:{token:token}})
    },[])

    const Logout = useCallback( ()=>{
        dispatch({type:USER_ACTION_TYPE.LOGOUT})
    },[])

    return {state,Login,Logout}
}

type UserReducerType = ReturnType<typeof UserStateReducer>

const UserContextInit ={
    state: initState ,
    Login: (token: string) => {},
    Logout: () => {}
}

const UserContext = createContext<UserReducerType>(UserContextInit);

type Children= {
    children:ReactElement | undefined
}

export const UserContextProvider =({children,...initState}:Children&UserState):ReactElement=>{

    return(
        <UserContext.Provider value={UserStateReducer(initState)}>
            {children}
        </UserContext.Provider>
    )
}

type userRegisterType = {
    token: string ,
    Login: (token: string) => void,
    Logout: () => void

}
export const useRgister =():userRegisterType=>{
    const {state:{token} ,Login,Logout} = useContext(UserContext)
    return{token,Login,Logout}
}








