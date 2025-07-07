import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Cars from './pages/Cars';
import CarDetails from './pages/CarDetails';
import MyBookings from './pages/MyBookings';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Dashboard from './pages/owner/Dashboard';
import AddCar from './pages/owner/AddCar';
import ManageCars from './pages/owner/ManageCars';
import ManageBooking from './pages/owner/ManageBooking';
import Layout from './pages/owner/Layout';
import Login from './components/Login';
import {Toaster} from 'react-hot-toast';

const App = () => {

  const [showLogin, setShowLogin] = useState(false);
  const isOwnerPath = useLocation().pathname.startsWith('/owner')
 
  return (
    <>
    <Toaster/>
    {showLogin &&   <Login setShowLogin = {setShowLogin} /> }
  
     {!isOwnerPath && <Navbar setShowLogin={setShowLogin} />}
     {/* <Home/> */}
     <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/car-details/:id' element={<CarDetails/>} />
        <Route path='/cars' element={<Cars/>} />
        <Route path='/my-bookings' element={<MyBookings/>} />
        {/* <Route  /> */}

        {/* For Owner Login */}
        <Route path='/owner' element={<Layout/>}>
          <Route index element={<Dashboard/>} />
          <Route path="add-car" element={<AddCar/>}/>
          <Route path="manage-cars" element={<ManageCars/>}/>
          <Route path="manage-bookings" element={<ManageBooking/>}/>
        </Route>
     </Routes>
     {!isOwnerPath && <Footer/>}
    </>
  
  )
}

export default App
