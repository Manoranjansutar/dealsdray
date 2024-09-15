import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Login from './components/Login'
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Employees from './components/Employees';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);
 
  return (
    <BrowserRouter>
      <Navbar token={isAuthenticated ? 'token' : null} setIsAuthenticated={setIsAuthenticated}/>
      <Toaster position="top-center" reverseOrder={false} />
    <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Home />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> :<Login isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path='/employees' element={isAuthenticated ? <Employees /> : <Navigate to="/login" />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
