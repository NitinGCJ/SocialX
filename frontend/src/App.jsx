import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/singup'
import { Signin } from './pages/signin'
import { Profilemaker } from './pages/profilemaker'
import { Dashboard } from './pages/dashboard'
import { Editprofile } from './pages/editprofile'
import { Myposts } from './pages/myposts'
import { Frienddashboard } from './pages/frienddashboard'
import { Makefriend } from './pages/makefriend'



function App() {
      
       const [username,setusername]=useState("")
       const [password,setpassword]=useState("")
  
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/signin' element={<Signin/>}></Route>
      <Route path='/makeprofile' element={<Profilemaker/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
      <Route path='/edit_profile' element={<Editprofile/>}></Route>
      <Route path='/my_posts' element={<Myposts/>}/>
      <Route path='/frienddashboard'element={<Frienddashboard/>}></Route>
      <Route path="/make_friends" element={<Makefriend/>}></Route>
    </Routes>
    </BrowserRouter>

    </>
  
  )
}

export default App
