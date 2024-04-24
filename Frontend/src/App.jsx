import React from 'react'
import {BrowserRouter, Routes , Route} from 'react-router-dom'
import Login from './component/Login';
import Register from './component/Register';
import Dashboard from './component/Dashboard'

export default function App() {
  return (
    <div>
   <BrowserRouter>
   <Routes>
        <Route path='/' element = {<Login />} />
        <Route path='/login' element = {<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/Dashboard" element={<Dashboard />} />
   </Routes>
   </BrowserRouter>
    </div>
  )
}
