import './App.css';
import React, { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import NavBar from './components/navBar/NavBar';
import Landing from './components/landing/Landing';
import Home from './components/home/Home';
import Details from './components/details/Details.jsx';
import Forms from './components/form/Forms.jsx';




function App() {

  const {pathname} = useLocation()
 
  const [page, setPage] = useState(1)

  return (
    <div className="App">

      {pathname === "/home" ? <NavBar setPage={setPage}/> : null}
      <Routes>

        <Route path="/" element={<Landing/>}/>
        
        <Route path='/home' element={<Home setPage={setPage} page={page}/>} />

        <Route path='detail/:origin/:id' element={ <Details /> } />

        <Route path='/form' element={<Forms />} />

      </Routes>
    </div>
  );
}

export default App;
