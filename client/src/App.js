import './App.css';
import React from 'react';
import Landing from './components/landing/Landing.jsx';
import { Route, Routes } from 'react-router-dom';



function App() {
  return (
    <div className="App">
      <h1>Henry Dogs</h1>
      <Routes>
        <Route path="/" element={<Landing/>}/>
      </Routes>
    </div>
  );
}

export default App;
