import { useState } from "react";
import { toast } from 'react-hot-toast'
import { useAuthContext } from "../context/authContext";


const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async({fullName, email, password, confirmPassword}) => {
    const success = handleInputsError({fullName, email, password, confirmPassword})
    if(!success) return;
    setLoading(true)
try {
    const res = await fetch('http://localhost:5005/api/auth/signup', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password, confirmPassword }),
      });

 if (!res.ok) {
    throw new Error(data.error || "Signup failed");
  }

 const data = await res.json()
 if(data.error) {
    throw new Error(data.error)
 }

 // set de users in de locale storage an update is
 localStorage.setItem('form-app', JSON.stringify(data));
 console.log(localStorage.getItem("form-app")); 
   // Update context state
   setAuthUser(data);
 
  toast.success("Signup successful! Welcome 🎉");
      console.log(data);

} catch(error) {
    toast.error(error.message)
} finally {
    setLoading(false)
}

  }
  return {loading, signup}
}

export default useSignUp;


const handleInputsError = ({ fullName, email, password, confirmPassword }) => {
    if (!fullName || !email || !password || !confirmPassword) {
        toast.error('Please fill all the fields');
        return false;
    }
   if(password !== confirmPassword) {
    toast.error('Password do not match');
    return false;
   }
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if (!emailRegex.test(email)) {
    toast.error('Please enter a valid email address');
    return false;
}
return true;
};




