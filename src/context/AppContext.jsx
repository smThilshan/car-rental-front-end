import React,{ createContext, useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { data, useNavigate } from "react-router-dom";
import { useEffect } from "react";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const currency = import.meta.VITE_CURRENCY;

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const [cars, setCars] = useState([]);

  // func to check the user is loggedin?
  const fetchUser = async ()=>{
    try {
      const {data} = await axios.get('/api/user/data')
      if(data.success){
        setUser(data.user);
        setIsOwner(data.user.role === 'owner');
      } else{
        navigate('/');
      }

    } catch (error) {
      toast.error(error.message);
      
    }
  }

  // Fetch all cars
  const fetchCars = async ()=>{
    try {
      const {data} = await axios.get('/api/user/cars');
      data.success ? setCars(data.cars) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  }

  // func to Log out User
  const logout = ()=>{
    localStorage.removeItem(token);
    setToken(null);
    setUser(null);
    setIsOwner(false);
     axios.defaults.headers.common['Authorization'] = "";
     toast.success("You have been logged out");
  }


  // useEffect to retrieve the token from local storage
  useEffect(()=>{
    const token = localStorage.getItem('token');
    setToken(token);
  },[]);

  // useEffect to fetch the local data when token is available
  useEffect(()=>{
    if(token){
      axios.defaults.headers.common['Authorization'] = `${token}`
      fetchUser();
       fetchCars(); //
    }
  },[token]);

//   useEffect(() => {
//   fetchCars();
// }, []);


  const value = {
    navigate, currency, axios, user, setUser, token, setToken, isOwner, setIsOwner, fetchUser, showLogin, setShowLogin, logout, fetchCars, cars, setCars, pickupDate, returnDate, setPickupDate, setReturnDate
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
