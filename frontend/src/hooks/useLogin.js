import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/authContext"; 


const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const login = async( email, password) => {
     
      setLoading(true)
  try {
      const res = await fetch('/api/auth/login', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password}),
          credentials: "include",
        });
  
   
  
   const data = await res.json()
   if (data.error) {
    throw new Error(data.error || "Login failed");
  }
  
   // set de users in de locale storage an update is
   localStorage.setItem("form-app", JSON.stringify(data));
   // Update context state
   setAuthUser(data); 
    
   
    toast.success("Login successful! Welcome 🎉");
        console.log(data);
  
  } catch(error) {
      toast.error(error.message)
  } finally {
      setLoading(false)
  }
  
    }
    return {loading, login}
  }
  
  export default useLogin;
  
  
  



