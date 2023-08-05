import React, { Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import BookContext, { initState } from './component/DataContext/BookContext';
import { initState as userInit }  from './component/DataContext/Test';
import BookData from './component/DataContext/BookData';
import { UserContextProvider } from './component/DataContext/Test';
import UserRegister from './component/DataContext/UserRegister';
import { QueryClient, QueryClientProvider } from 'react-query';
import SuperHeros from './component/SuperHerosRQ/SuperHeros';
import { Route } from 'react-router-dom';
import SuperHeroItem from './component/SuperHerosRQ/SuperHeroItem';
import Routes from './Routes';

function App() {

  const queryClient = new QueryClient();

  return (
    <Fragment>
      <QueryClientProvider client={queryClient}>
  
       <Routes/>
    </QueryClientProvider>

    </Fragment>

  );
}

export default App;
