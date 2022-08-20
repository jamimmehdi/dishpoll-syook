import { createContext, useContext, useState } from "react";
const users = require('../../api/users.json');

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Authenticate user
    const authenticateUser = (user, password) => {
        for (const user_detail of users) {
            if (user_detail.username === user && user_detail.password === password) {
                setUser(user);
                return true;
            }
        };
        return false;
    }

    // Logout
    const logout = () => {
        setUser(null);
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                logout,
                authenticateUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}