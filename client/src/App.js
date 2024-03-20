import './App.css';
import React, { useState } from 'react';
import Landing from './components/landing/Landing.jsx';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import NavBar from './components/navBar/NavBar.jsx';
import Home from './components/home/Home.jsx';
import Details from './components/details/Details.jsx';



function App() {

  const {pathname} = useLocation()

  const [page, setPage] = useState(1)

  return (
    <div className="App">

      {pathname === "/home" ? <NavBar setPage={setPage}></NavBar> : null}
      <Routes>
        <Route path="/" element={<Landing/>}/>
        
        <Route path='/home' element={<Home setPage={setPage} page={page}/>} />

        <Route 
          path='detail/:origin/:id' 
          element={
            <div className='Details'>
              <div className='ButtonHome'>
                <Link to={"/home"}>
                  <button>⬅</button>
                </Link>
              </div>
              <Details />
            </div>
        } />

        

      </Routes>
    </div>
  );
}

export default App;
