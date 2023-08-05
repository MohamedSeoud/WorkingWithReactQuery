import React from 'react'
import { useRoutes } from 'react-router-dom'
import SuperHeros from './component/SuperHerosRQ/SuperHeros'
import BookData from './component/DataContext/BookData'
import SuperHeroItem from './component/SuperHerosRQ/SuperHeroItem';

export default function Routes() {
    const Element = useRoutes([
        { path:'/en', element: <SuperHeros/>},
        { path:'/bookData' ,element: <BookData/>}, 
        { path:'/SuperHeroItem/:heroId',  element: <SuperHeroItem/>}
    ]);

  return Element
}

