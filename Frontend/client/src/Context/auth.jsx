import { useState, useContext, createContext, useEffect } from "react";
import axios from "axios"

const authContext = createContext();


const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: "",
    });

    //default axios
    axios.defaults.headers.common["Authorization"] = auth?.token;
    useEffect(() => {
        const data = localStorage.getItem("auth")
        if (data) {
            const parseData = JSON.parse(data)
            setAuth({...auth, 
                user: parseData.user,
                token: parseData.token
            })
        }
         //eslint-disable-next-line
    }, []);
    
    return (
        <authContext.Provider value={[auth, setAuth]}>
            {children}
        </authContext.Provider>
    );
};

const useAuth = () => useContext(authContext);

export {  AuthProvider,useAuth };

