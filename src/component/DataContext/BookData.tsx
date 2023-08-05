import React, { Fragment, useContext } from 'react'
import BookContext, { initState, useCounter } from './BookContext'


function BookData() {

  const data = useCounter()

  return (
    <Fragment>
      <div>{data.count}</div>
      <input onChange={data.AddInput}/>
      <button onClick={data.Increment}>Increment</button>
      <button onClick={data.Decrement}>Decrement</button>
    </Fragment>
  )
}

export default BookData
