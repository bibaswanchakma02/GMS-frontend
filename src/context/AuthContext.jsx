import React, {createContext, useContext, useEffect, useState} from "react";
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();


//custom hook to use AuthContext

export const useAuth = ()=>{
    return useContext(AuthContext);
};

export const AuthProvider = ({children}) =>{
    const [auth, setAuth] = useState({
        token: localStorage.getItem('token') || null,
        role: null,
        username: null
    });

    useEffect(()=>{
        if(auth.token){
            try{
                const decodedToken = jwtDecode(auth.token);
                const role = decodedToken.roles? decodedToken.roles[0] : 'USER';
                setAuth({
                    token: auth.token,
                    role,
                    username: decodedToken.sub,
                });
                axios.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`;
                
                const currentTime = Date.now() / 1000;
                const expiresIn = decodedToken.exp - currentTime;
                if (expiresIn > 0) {
                    setTimeout(() => {
                        localStorage.removeItem('token');
                        
                    }, expiresIn * 1000);
                } else {
                    logout();
                }
            }catch(error){
                logout();
            }
        }
    }, [auth.token])

    const login = (token) =>{
        localStorage.setItem('token', token);
        const decodedToken = jwtDecode(token);

        const role = decodedToken.roles? decodedToken.roles[0] : 'USER';
        setAuth({
            token,
            role,
            username: decodedToken.sub,
        })
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        const currentTime = Date.now() / 1000;
        const expiresIn = decodedToken.exp - currentTime;
        if (expiresIn > 0) {
            setTimeout(() => {
                localStorage.removeItem('token');
                // Keep the state but remove the token from local storage
            }, expiresIn * 1000);
        } else {
            logout();
        }
    }

    const logout = ()=>{
        localStorage.removeItem('token');
        setAuth({ token: null, role: null, username: null });
        delete axios.defaults.headers.common['Authorization'];
    
    };

    const isTokenExpired = (token)=>{
        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now()/1000;
            return decodedToken.exp < currentTime;
        } catch (error) {
            return true;
        }
    }

    return (
        <AuthContext.Provider value={{auth, setAuth, login, logout, isTokenExpired}}>
            {children}
        </AuthContext.Provider>
    )
}