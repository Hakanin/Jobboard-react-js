import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar'; // Import the Navbar component
import Footer from './Footer';





const Register = () => {
    
    //User where we'll store input data 
    const [user, setUser] = useState({
        firstName:"",
        lastName:"",
        username:"",
        password:"",
        email:"",
        phone:"",
        adresse:"",
        role:"",

      });

    const navigate = useNavigate()
    
    //Function that tracks the user inputs
    const handleChange = (e) => {
        setUser((prev) =>({...prev, [e.target.name]: e.target.value}))
    }

    //Function that handles the data submit and the request for creation of the new user 
    const handleClick =  async (e) => {
        e.preventDefault()
        try{
            const newUser = {
                ...user,
                phone: user.phone || null,
                adresse: user.adresse || null,
            }
            
            await axios.post("http://localhost:8800/users", newUser)
            navigate("/Login")
        }catch(err){
            console.log("Error creating user", err)
        }
    }


    ///HTML display of the register page
return (
    <>
    <Navbar/>
    <form className="register">
        <input type = "text" placeholder = "First Name*" onChange={handleChange} name="firstName" required/>
        <input type = "text" placeholder = "Last Name*" onChange={handleChange} name="lastName" required/>
        <input type = "text" placeholder = "Username*" onChange={handleChange} name="username" required/>
        <input type = "password" placeholder = "Password*" onChange={handleChange} name="password" required/>
        <input type = "email" placeholder = "Email*" onChange={handleChange} name="email" required/>
        <input type = "text" placeholder = "phone" onChange={handleChange} name="phone"/>
        <input type = "adresse" placehoser= "adresse" onChange={handleChange} name="adresse"/>
        <label for="role">Who are you?*:</label>
        <select id="role" name="role" onChange={handleChange} required> 
            <option value="">--Select Role--</option>
            <option value="jobSeeker">Job Seeker</option>
            <option value="professional">Professional</option>
        </select>

        <p>Les champs avec un "*" sont obligatoires</p>
        <button onClick= {handleClick} className='formButton'>Inscription</button>
    </form>

    <Footer/>
    </>

)



}

export default Register