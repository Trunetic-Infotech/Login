import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/Auth';
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import Spinner from '../spinner';


const UserPrivateRoute = () => {

      const [ok,setOk] =useState(false);
      const {auth} =useAuth()


      useEffect(()=>{
            const authcheck =async ()=>{

                  const res =await axios.get("http://localhost:3000/api/v1/user/user-auth")
                  if(res.data.ok){
                        setOk(true)
                  }else{
                        setOk(false)
                  }
            }
            if(auth?.token) authcheck()
            
            },[auth?.token])
  return (
    ok ? <Outlet /> : <Spinner />
  )
}

export default UserPrivateRoute
