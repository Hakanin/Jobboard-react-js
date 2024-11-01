import React, { useState, useEffect } from "react";
import '../style.css'; 
import AdCard from '../Adcard';
import axios from 'axios';
import axiosInstance from './AxiosInstance';

import Navbar from './Navbar'; // Import the Navbar component
import Footer from './Footer';

import { useNavigate } from 'react-router-dom';
import CircleBackground from './CircleBackground';



// Composant Accueil
const Accueil = () => {
  const [advertisements, setAds] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false); //formulaire postuler
  const [selectedAdId, setSelectedAdId] = useState(null);


  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const handleRedirect = () => {
    navigate('/UserApplications');
};


  //For now refresh the tokens when the page is refreshed and the ads are displayed
  useEffect(() => {
    const fetchAllAds = async() => {
        try {
            const res = await axiosInstance.get("http://localhost:8800/ads");
            setAds(res.data);
        } catch(err) {
            console.log(err);
        }
    }
    fetchAllAds()
  }, []);

  const openApplicationForm = (adId) => {
    if (selectedAdId === adId && isFormOpen) {
      setIsFormOpen(false);  // Fermer le formulaire si c'est le même adId
      setSelectedAdId(null);
    } else {
      setSelectedAdId(adId);
      setIsFormOpen(true);
    }
  };

  const user = JSON.parse(localStorage.getItem("user"));

  const handleApplicationSubmit = async (event) => {
    event.preventDefault();
    const { firstName, lastName, email, phone, message } = event.target.elements;

    try {
      await axios.post('http://localhost:8800/applications', {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        phone: phone.value,
        message: message.value,
        adId: selectedAdId,
        userId: storedUser.id,
      });
      alert("Candidature envoyée avec succès !");
      setIsFormOpen(false);  // Fermer le formulaire après soumission
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'envoi de la candidature");
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log("Stored User:", storedUser); // This will print what's inside localStorage
  }, []);

  const handleLogout = async () => {
    
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const refreshToken = user?.refreshToken;
      
      await axiosInstance.post("http://localhost:8800/logout", {
        token: refreshToken,
      }, {
        headers: {
          "Authorization": `Bearer ${user.accessToken}`,
        },
      });

      localStorage.removeItem("user");

    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="body">
      <Navbar onLogout={handleLogout}/>
      <div className="main" id="accueil">
        <div className="zone1">
          <h1>1 064 527 offres d'emploi disponibles</h1>
        </div>

        <div className="backgroundDashboard">
        <CircleBackground />
          <div className="aligne">
            <h2>Entreprise</h2>
            <p>Vous êtes une entreprise ou un particulier employeur ? France Travail vous propose un espace dédié !</p>
          </div>
        </div>

        <div className="zone3">
          <div className="aligne">
            <h2>Les emplois récemment postés</h2>
            <div className="grille">
              {advertisements.map(ad => (
                <div className="caseemploi" key={ad.id}>
                  <AdCard
                    title={ad.title}
                    shortDescription={ad.description}
                    fullDescription={ad.description}
                    wages={ad.salary}
                    place={ad.location}
                    workingTime={ad.contract_type}
                    onApplyClick={() => openApplicationForm(ad.id)}
                  />
                </div>
              ))}

              {isFormOpen && selectedAdId && (
                <form onSubmit={handleApplicationSubmit} className="application-form">
                  <label>
                    Prénom :
                    <input type="text" name="firstName" defaultValue={user?.firstName || ''} required />
                  </label>
                  <label>
                    Nom :
                    <input type="text" name="lastName" defaultValue={user?.lastName || ''} required />
                  </label>
                  <label>
                    Email :
                    <input type="email" name="email" defaultValue={user?.email || ''} required />
                  </label>
                  <label>
                    Téléphone :
                    <input type="tel" name="phone" defaultValue={user?.phone || ''} required />
                  </label>
                  <label>
                    Message :
                    <textarea name="message" required></textarea>
                  </label>
                  <button type="submit" className="btn-connexion">Postuler à l'offre</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Accueil;
