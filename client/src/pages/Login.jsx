import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const URL = "http://localhost:5000/api/auth/login";


export const Login = () => {
    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    const navigate = useNavigate();
    const {storeTokenInLS} = useAuth();
    
    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value,
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user),
            });

            const res_data = await response.json();
            console.log("login", response);
            if(response.ok) {
                 storeTokenInLS(res_data.token);
                toast.success("login Successful")
                setUser({  
                    email: "",
                    password: "",
                });
                navigate("/");
            }else{
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }
        } catch (error) {
            console.log(error);
        }
        
        
    }
    
    return (
    <>
    <section>
        <main>
            <div className="section-registeration">
                <div className="container grid grid-two-cols">
                    <div className="registeration-image">
                        <img src="/images/login.png" alt="let's fill the login form" width='500' height="500" />
                    </div>
                    <div className="registeration-form">
                        <h1 className="main-heading mb-3">login form</h1>
                        <br />

                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email">email</label>
                                <input type="email" name="email" placeholder="enter your email" id="email" required autoComplete="off" value={user.email} onChange={handleInput}/>
                            </div>
                            <div>
                                <label htmlFor="password">password</label>
                                <input type="password" name="password" placeholder="password" id="password" required autoComplete="off" value={user.password} onChange={handleInput}/>
                            </div>
                            <br />
                            <button type="submit" className="btn btn-submit">Login Now</button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    </section>
    </>
    )
};