import { createContext, useContext, useState } from "react";

// Create the AuthContext
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

// Custom hook to use the AuthContext
// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
    return useContext(AuthContext);
};

// AuthContextProvider to manage user state and context
// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(
        JSON.parse(localStorage.getItem("form-app")) || null // Get user data from localStorage
    );

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
};
