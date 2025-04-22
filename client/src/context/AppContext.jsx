import React, { useState } from "react";
import { createContext } from "react";
import axios from "axios";





export const AppContent = createContext();
export const AppContextProvider = (props)=>{

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const [isLoggedin,setIsLoggedin]= useState(false);
const [userData,setUserData]= useState(false);

const getUserDetails= async()=>{
    try {
        const {data}= await axios.get(backendUrl+'/api/user/data',{
            withCredentials:true
        })
        data.success? 
        setUserData(data.userData) : 
        toast.error(data.message);
    } catch (error) {
        toast.error(error.message);
    }
}

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
