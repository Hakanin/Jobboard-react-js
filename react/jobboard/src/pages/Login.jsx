import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar'; // Import the Navbar component
import Footer from './Footer';
import { Link } from "react-router-dom"


//Changed the way we handled the login // Need to add new info the local storage 

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    //Check if there is a logged in user, if there is redirect him to the user Dashboard
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        
        if (storedUser) {
            navigate("/Dashboard");
        }
    });
    
    //Function that handles the logging in of the user and set the user inside the localStorage
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

        const res = await axios.post("http://localhost:8800/login", {username, password});

        //Store data from user inside localStorage
        localStorage.setItem("user", JSON.stringify(res.data));



        navigate(`/Dashboard`);

        } catch (err) {
        console.log(err);
        }
    }
    
   

    return (
        <>
        <Navbar/>
        <div className="container">
            <div className='login'>
                <form onSubmit={handleSubmit} className='loginForm'>
                    <span className='formTitle'>Login</span>
                    <input
                        type="text"
                        placeholder="username"
                        onChange= {(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="password"
                        onChange= {(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className='submitButton'>
                        Login
                    </button>
                        <p>Vous n'avez pas encore de compte ? <span><a href="/Register">Inscrivez-vous</a></span></p>
                        <p>
                            Vous souhaitez modifier les informations de votre profil? <Link to="/Updateuser">Cliquez ici</Link>
                        </p>
                    </form>
                </div>
        </div>
        <Footer/>
        </>
    );
}

export default Login