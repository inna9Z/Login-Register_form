import useLogOut from "../hooks/useLogOut"
import { useState, useEffect } from "react";
import { useAuthContext } from "../context/authContext";

const HomePage = () => {
    const { loading, logout } = useLogOut();
    const { authUser } = useAuthContext(); // Get the user data from context
    const [userName, setUserName] = useState("");


    useEffect(() => {
        if (authUser) {
            setUserName(authUser.fullName);  // Assuming fullName is stored in context
        } else {
            const storedUser = JSON.parse(localStorage.getItem("form-app"));
            if (storedUser) {
                setUserName(storedUser.fullName); // Assuming fullName is stored in localStorage
            }
        }
    }, [authUser]);



    return (
        <div>

            <div>
                {userName ? `Hello, ${userName} 🎉!` : "Hello, Guest!"}
            </div>
            <button onClick={logout} disabled={loading}>
                {loading ? "Logging out..." : "Log out"}
            </button>
        </div>
    )
}

export default HomePage
