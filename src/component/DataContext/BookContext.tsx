import React, { ChangeEvent, ReactElement, ReactNode, createContext, useCallback, useContext, useReducer } from 'react'

type StateType={
  count: number;
  text: string;
}
export const initState:StateType ={
  count:0,
  text:''
}
export const enum REDUCER_ACTION_TYPE{
  INCREMENT,
  DECREMENT,
  NEW_INPUT
}

type ReducerAction={
  type:REDUCER_ACTION_TYPE,
  payload?:string|number,
}

const reducer = (state:StateType,action:ReducerAction):StateType=>{
  switch (action.type){
    case REDUCER_ACTION_TYPE.INCREMENT:
      return{...state, count:state.count++}
    
    case REDUCER_ACTION_TYPE.DECREMENT:
      return{...state, count:state.count--}

    case REDUCER_ACTION_TYPE.NEW_INPUT:
      return{...state, count: state.count + Number(action.payload)}
    
    default:
      throw new Error();
  }
}

const useCounterContext =(initState:StateType)=>{
const[state,dispatch] = useReducer(reducer,initState);

const Increment = useCallback( ()=>{
  dispatch({ type:REDUCER_ACTION_TYPE.INCREMENT })
},[])

const Decrement = useCallback( ()=>{
  dispatch({ type:REDUCER_ACTION_TYPE.DECREMENT })
},[])

const AddInput = useCallback( (event:ChangeEvent<HTMLInputElement>)=>{
  dispatch({ type:REDUCER_ACTION_TYPE.NEW_INPUT,payload:event.target.value })
},[])

return{state,Increment,Decrement,AddInput}
}

type UseCounterContextType = ReturnType< typeof useCounterContext >

const initCounterContext :UseCounterContextType ={
  state:initState,
  Increment:()=>{},
  Decrement:()=>{},
  AddInput:(event:ChangeEvent<HTMLInputElement>)=>{}
};


const CounterContext = createContext<UseCounterContextType>(initCounterContext)




type Props ={
  children?:ReactElement | undefined,
}

export const BookContext = ({children, ...initState}:Props & StateType):ReactElement=> {
  return (
    <CounterContext.Provider value={useCounterContext(initState)}>
      {children}
    </CounterContext.Provider>
  )
}

type useCounterHookType ={
  count:number
  text:string
  Increment:()=>void
  Decrement:()=>void
  AddInput:(event:ChangeEvent<HTMLInputElement>)=>void
}
export const useCounter =(): useCounterHookType =>{
  const{state:{count,text},Increment,Decrement,AddInput} = useContext(CounterContext);
  return{count,text,Increment,Decrement,AddInput}
}

export default BookContext
