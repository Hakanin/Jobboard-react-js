import React from 'react';
import '../style.css'; // Make sure your styles are applied here too

const Footer = () => {
  return (
    <footer className="footer">
      <div className="zone4">
        <div className="aligne">
          <h2>Entreprise</h2>
          <p>
            Vous êtes une entreprise ? Nous vous proposons des solutions pour trouver vos prochains talents. 
            Contactez-nous pour plus d'informations.
          </p>
        </div>
      </div>
      <div className="zone5">
        <div className="aligne">
          <hr className="custom-hr" />
          <p>Copyright 2024 © Thème inspiré de France Travail</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
