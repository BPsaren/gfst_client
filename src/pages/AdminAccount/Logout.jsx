/*import { useEffect } from "react"
import{useNavigate} from "react-router-dom";
import { useAuth } from "../../store/auth";

export const Logout=()=>{
    const navigate =  useNavigate();

     const {LogoutUser} = useAuth();
     
    useEffect(()=>{
    LogoutUser()
    },[LogoutUser]) ;



    return navigate("/login");

}
*/

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";

export const Logout = () => {
  const navigate = useNavigate();
  const { LogoutUser } = useAuth();

  useEffect(() => {
    // Perform the logout logic
    LogoutUser();
    // Navigate to the login page after logout
    navigate("/login");
  }, [LogoutUser, navigate]); // Ensure that dependencies are included

  // Return null or a loading message while logging out
  return <div>Logging out...</div>;
};


