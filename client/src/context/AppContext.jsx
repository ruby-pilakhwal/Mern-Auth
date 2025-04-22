import React, { useState, useEffect } from "react";
import { createContext } from "react";
import axios from "axios";

export const AppContent = createContext();
export const AppContextProvider = (props)=>{

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const [isLoggedin,setIsLoggedin]= useState(false);
const [userData,setUserData]= useState({});

const getUserDetails= async()=>{
    try {
        const {data}= await axios.get(backendUrl+'/api/user/data',{
            withCredentials:true
        })
        if(data.success){
            setUserData(data.user);
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        toast.error(error.message);
    }
}

// Fetch user details when component mounts
useEffect(() => {
    getUserDetails();
}, []);

const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserDetails
};


  return (
    <AppContent.Provider value={value}>
        {props.children}
    </AppContent.Provider>
  );
};
