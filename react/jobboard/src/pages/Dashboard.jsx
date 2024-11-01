import React, { useEffect, useState } from 'react'
import axios from 'axios';
import axiosInstance from './AxiosInstance';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'; // Import the Navbar component
import Footer from './Footer'; // Import the Footer component
import CircleBackground from './CircleBackground';

const Dashboard = () => {

  //Navbar logout management
  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user data
    navigate("/"); // Navigate to login page
  };

  //Where the logged in user is stored
  const [user, setUser] = useState({
    firstName:"",
    lastName:"",
    username:"",
    email:"",
    phone:"",
    adresse:"",
    role:"",
    id:"",
    companyId: null,
  });

  //Where the company data will be stored
  const [company, setCompany] = useState({
    name:"",
    description:"",
    website:"",
    email:"",
    location:"",
  })

  //Initialize an empty Job Offer, that way when the user create a new Job Offer, the page refresh and we don't see the previous inputs but the placeholders
  const initialJO = {
    title:"",
    description:"",
    location:"",
    salary:"",
    contract_type:"",
  }

  //Where the inputs for JO creation will be stored
  const [JO, setJO] = useState(initialJO)

  //Where the Job Offers created by the professional user will be stored
  const [jobOffers, setJobOffers] = useState([])

  const navigate = useNavigate();

  
////////////////////////////////GENERAL USER INFO PART/////////////////////////////////////////////////
  
  //Set the user with the data located in the localStorage
  //Then if there is a company associated to that user, load the company data inside the var
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);

      if (storedUser.companyId) {
        axios.get(`http://localhost:8800/companies/${storedUser.companyId}`)
          .then(response => {
            setCompany(response.data[0]);
          })
          .catch(err => {
            console.log("Error fetching company data", err);
          });
      }
    }
  }, []);
  
  //Function that handles the input for user info display/update
  const handleChangeUser = (e) => {
    setUser((prev) =>({...prev, [e.target.name]: e.target.value}));
  }

  //Function that handles user info modification
  //Submitting only the modified fields
  const handleClick =  async (e) => {
    e.preventDefault()

    const modifiedFields = {}

    for (const key in user) {
      if (user[key] !== "") {
        modifiedFields[key] = user[key];
      }
    }
    try{
        await axiosInstance.put(`http://localhost:8800/users/${user.id}`, modifiedFields)
        
        const updatedUser = {...user, ...modifiedFields};
        localStorage.setItem("user", JSON.stringify(updatedUser));

        setUser(updatedUser);

        navigate("/Dashboard")
    }catch(err){
        console.log(err)
    }
  }


  //////////////////////////////////COMPANY CREATION/MODIFICATION PART////////////////////////////////////////

  //Functions that the input for the creation/modification of a new company
  const handleChangeCompany = (e) => {
    setCompany((prev) =>({...prev, [e.target.name]: e.target.value}));
  }

  //Function that handles the company creation
  const handleCompanyCreation = async (e) => {
    e.preventDefault ()

    try {
      const newCompany = {
        ...company,
        website: company.website || null
      }

      //request for creation of the company, inside the response is stored the company ID
      const response = await axios.post("http://localhost:8800/companies", newCompany);

      const companyId = parseInt(response.data.companyId, 10);
      
      //This company ID will then be attached to the user data
      //That way the professional user is linked to its company
      const updatedUser = {...user, companyId};

      await axios.put(`http://localhost:8800/users/${user.id}`, updatedUser);

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);

      navigate("/Dashboard");
    } catch (err) {
      console.log("Error creating company", err)
    }
  }

  //Function that handles the modification of the company's data
  const handleCompanyUpdate = async (e) => {
    e.preventDefault()

    const modifiedFields = {}

    for (const key in company) {
      if (company[key] !== "") {
        modifiedFields[key] = company[key];
      }
    }
    try{
        await axios.put(`http://localhost:8800/companies/${company.id}`, modifiedFields)
        
        const response = await axios.get(`http://localhost:8800/companies/${company.id}`);
        setCompany(response.data[0]);

        navigate("/Dashboard")
    }catch(err){
        console.log(err)
    }
  }

  //Function that tracks inputs for Job Offer creation
  const handleOfferChange = (e) => {
    setJO((prev) =>({...prev, [e.target.name]: e.target.value}))
  }

  //Function that handles the creation of a new Job Offer
  //We link this Job Offer to the company ID, that way we know who has created which JO
  const handleNewOffer =  async (e) => {
    e.preventDefault()
    try{
        const newOffer = {
          ...JO,
          companyId: user.companyId,
        };

        await axios.post("http://localhost:8800/ads", newOffer) 

        setJO(initialJO) //Resetting the JO fields
      
        setTimeout(() => {
          navigate("/Dashboard");
      }, 100); 
    }catch(err){
        console.log(err)
    }
  }


  //Get all the Job Offers from the DB and store them in JobOffers
  useEffect(() => {
    const fetchAllAds = async() => {
        try {
            const res = await axios.get("http://localhost:8800/ads");
            setJobOffers(res.data);
        } catch(err) {
            console.log(err);
        }
    }
    fetchAllAds()
  }, []);

  //filter the Job Offers to only get the ones associated to the user's company ID
  const companyOffers = jobOffers.filter(ad => ad.companyId === user.companyId);

  //Redirect to the update page specific to the chosen Job Offer
  const handleUpdateOffer = (id) => {
    navigate(`/Update/${id}`);
  };

  /////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////JOB SEEKER PART///////////////////////////////////////////

  
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/applications`);
        setApplications(res.data);
        console.log(res);
      } catch (err) {
        console.error("Erreur lors de la récupération des demandes:", err);
        setError(true);
      }
    };

    fetchApplications();
  }, []);

  const userApplications = applications.filter(app => app.userId === user.id);
  
  //Conditional page display, here we'll show only info specific to professional users 
  if (user.role === "professional") {
    return (
      <>
      <Navbar onLogout={handleLogout}/>
      <div className='page'>
        <div className = "form">
          <h1>Your information</h1>
          <input type = "text" value={user.firstName || ""} onChange={handleChangeUser} name="firstName"/>
          <input type = "text" value={user.lastName || ""} onChange={handleChangeUser} name="lastName"/>
          <input type = "text" value={user.username || ""} onChange={handleChangeUser} name="username"/>
          <input type = "text" value={user.email || ""} onChange={handleChangeUser} name="email"/>
          <input type = "text" value={user.phone || ""} onChange={handleChangeUser} name="phone"/>
          <input type = "text" value={user.adresse || ""} onChange={handleChangeUser} name="adresse"/>
          <button onClick= {handleClick} className='formButton'>Update</button>
        </div>
        
        {/*here we'll display the company creation form if there is no company associated to the logged-in user*/}
        {user.companyId === null ? (
          <form>
            <input type = "text" placeholder = "Name*" onChange={handleChangeCompany} name="name" required/>
            <input type = "textarea" placeholder = "Description*" onChange={handleChangeCompany} name="description" required/>
            <input type = "text" placeholder = "Website" onChange={handleChangeCompany} name="website" />
            <input type = "email" placeholder = "Email*" onChange={handleChangeCompany} name="email" required/>
            <input type = "text" placeholder = "Location*" onChange={handleChangeCompany} name="location" required/>
            <p>Les champs avec un "*" sont obligatoires</p>
          <button onClick= {handleCompanyCreation} className='formButton' >Inscription</button>
          </form>
        ): (
        /*if there is an ID, we'll display company info that the user can modify if they want*/
        <div>
          <br></br>
          <br></br>
          <form>         
            <input type = "text" value = {company.name || ""} onChange={handleChangeCompany} name="name" required/>
            <input type = "textarea" value = {company.description || ""} onChange={handleChangeCompany} name="description" />
            <input type = "text" value = {company.website || ""} onChange={handleChangeCompany} name="website" required/>
            <input type = "email" value = {company.email|| ""} onChange={handleChangeCompany} name="email" required/>
            <input type = "text" value = {company.location || ""} onChange={handleChangeCompany} name="location" required/>
            <button onClick= {handleCompanyUpdate} className='formButton' >Update company</button>
          </form>
          <br></br>
          <br></br>
          {/*Job Offer creation form*/}
          <div className = "form">
            <h1>Create your Job Offer</h1>
            <input type = "text" value = {JO.title} placeholder = "Title" onChange={handleOfferChange} name="title"/>
            <input type = "text" value = {JO.description} placeholder = "Description" onChange={handleOfferChange} name="description"/>
            <input type = "text" value = {JO.location} placeholder = "Location" onChange={handleOfferChange} name="location"/>
            <input type = "text" value = {JO.salary} placeholder = "Salary" onChange={handleOfferChange} name="salary"/>
            <input type = "text" value = {JO.contract_type} placeholder = "Type of Contract" onChange={handleOfferChange} name="contract_type"/>
            <button onClick= {handleNewOffer} className='formButton' >Add</button>
          </div>
          {/*Display of the Job offers linked to user's company*/}
          <h1>My Job Offers</h1>
          {companyOffers.map(ad => (
                <div className="caseemploi" key={ad.id}>
                  <h2>{ad.title}</h2>
                  <p>{ad.description}</p>
                  <p>{ad.location}</p>
                  <p>{ad.salary}</p>
                  <p>{ad.contract_type}</p>
                  <button onClick= {() =>handleUpdateOffer(ad.id)} className='formButton' >Update your Job Offer</button>
                  <br></br>
                </div>
              ))}
        
        </div>

        )}    
      </div>
    <Footer/>
    </>  
    ) 

   
  }  else {
    <>
        <Navbar onLogout={handleLogout} />
        <div className="backgroundDashboard">
          <div className="circles-container">
            <CircleBackground />
            <div className="aligne">
              <h1>Modifier votre profil</h1>
              <form>
                <input type="text" name="firstName" placeholder="Prénom" value={user.firstName} onChange={handleChangeUser} />
                <input type="text" name="lastName" placeholder="Nom" value={user.lastName} onChange={handleChangeUser} />
                <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleChangeUser} />
                <input type="text" name="phone" placeholder="Téléphone" value={user.phone || ""} onChange={handleChangeUser} />
                <input type="text" name="address" placeholder="Adresse" value={user.address || ""} onChange={handleChangeUser} />
                <button onClick={handleClick} type="submit" className="btn-connexion">Mettre à jour</button>
              </form>
            </div>
            <div className="aligne">
              <h1>Mes candidatures envoyées</h1>
              
                <ul>
                  {userApplications.map((app) => (
                    <div className="form" key={app.id}>
                      <p>{app.firstName}</p>
                      <p>{app.lastName}</p>
                      <p>{app.message}</p>
                      <p>{app.adId}</p>
                    </div>
                  ))}
                </ul>
            </div>
          </div>
        </div>
        <Footer />
      </>
    return (
      <p></p>
    )
  }
  
  
}
export default Dashboard