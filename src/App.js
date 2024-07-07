import Header from './components/partials/Header';
import React from 'react';
import {} from'react-router-dom';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import { useState} from 'react';

function App(){

  return (
    <>
    <BrowserRouter>
    {/*<Header/>*/}
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
    
    </>
  );
}

export default App;
