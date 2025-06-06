import {createContext, useContext, useState, useEffect} from "react";


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState("");
    const [services, setServices] = useState("");

    const storeTokenInLS = (serverToken) => {
        setToken(serverToken);
return localStorage.setItem("token", serverToken);
    }

    let isLoggedIn = !!token;
    console.log("isLoggedIn",isLoggedIn);

    //tackling the logout functionality
    const LogoutUser = () => {
        setToken("");
        return localStorage.removeItem("token");
    }

    const userAuthentication = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/auth/user", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            if(response.ok){
                const data = await response.json();
                console.log("user data", data.userData);
                setUser(data.userData);
            }
        } catch (error) {
            console.error("Error fetching user data");
        }
    }

    //to fetch the Services data from the database

    const getServices = async() => {
        try {
            const response = await fetch("http://localhost:5000/api/data/service", {
                method: "GET",
            })
            
            if(response.ok){
                const data = await response.json();
                console.log(data.msg);
                setServices(data.msg);
            }
        } catch (error) {
            console.log(`services front-end error ${error}`);
        }
    }


    //JWT Authentication - to get the currently loggedin userdata
useEffect(() => {
    getServices();
    userAuthentication();
}, [])


return <AuthContext.Provider value={{isLoggedIn, storeTokenInLS, LogoutUser, user, services}}>
    {children}
</AuthContext.Provider>
}

export const useAuth = () => {
    const useContextValue = useContext(AuthContext);
    if(!useContextValue){
        throw new Error("useAuth used Outside of the provider")
    }
    return useContextValue;
}