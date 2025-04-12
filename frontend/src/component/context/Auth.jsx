import axios from "axios";
import { createContext, useState, useEffect,useContext } from "react";

// Create the AuthContext
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component to manage authentication state
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  //default Header token passs
  axios.defaults.headers.common['Authorization']=auth?.token

  useEffect(()=>{
    const data=localStorage.getItem("auth");
    if(data){
      const parseData =JSON.parse(data);

      setAuth({
        ...auth,
        user:parseData.user,
        token:parseData.token
      });
    }
    //eslint-disable-next-line
  },[]);
 

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
// // Custom hook to use the auth context
// export const useAuth =()=>useContext(AuthContext)
  