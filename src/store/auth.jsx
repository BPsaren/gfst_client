import { createContext, useContext,useState,useEffect } from "react";

export const AuthContext = createContext();

//toke store in  localhost
export const AuthProvider = ({ children }) => {

    //similarly toke store in  localhost

   const[token,setToken]=useState(localStorage.getItem("token"));
   const[user,setUser]=useState("");
   // token pass for getAllUsers
   const authorizationToken =`Bearer ${token}`

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };
    
    //if token are then isLoggedIn are true another not true
    let isLoggedIn= !!token;
     console.log("isLoggedIn",isLoggedIn);
  //tackling the log out functionality
  const LogoutUser=()=>{
    setToken("");
    return localStorage.removeItem("token");
  };
  //JWT authentication-to get the current logged-in user data
  const  userAuthentication=async()=>{
    try {
       const response = await fetch ("http://localhost:3000/api/auth/user",{
         method:"GET",
         headers:{
        Authorization:authorizationToken,
         }
       });
       if(response.ok){
        const data= await response.json();
        console.log("user data: ",data.user_data);
        setUser(data.user_data);
       }

      
    } catch (error) {
      console.log({message: "Error fetching user data"})
    }
  }




useEffect(()=>{

  userAuthentication();
},[]);



  return (
    <AuthContext.Provider value={{isLoggedIn,storeTokenInLS,LogoutUser,user,authorizationToken}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);

  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }

  return authContextValue;
};
