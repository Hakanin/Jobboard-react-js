import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';


//Site pour modifier les offres d'emplois
const Update = () => {
  const [ad, setAd] = useState({
    title:"",
    description:"",
    location:"",
    salary:"",
    contract_type:"",
  });

  
  const navigate = useNavigate()
  const location = useLocation()

  const adId = location.pathname.split("/")[2]

  

  const handleChange = (e) => {
    setAd((prev) =>({...prev, [e.target.name]: e.target.value}))
  }

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const res = await axios.get("http://localhost:8800/ads/"+ adId);
        setAd(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchAd()
  }, [adId]);

  const handleClick =  async (e) => {
    e.preventDefault()

    const modifiedFields = {}

    for (const key in ad) {
      if (ad[key] !== "") {
        modifiedFields[key] = ad[key];
      }
    }
    try{
        await axios.put("http://localhost:8800/ads/"+adId, modifiedFields)
        navigate("/Dashboard")
    }catch(err){
        console.log(err)
    }
  }

  console.log(ad)
  return (

    <>
    <Navbar/>
    <div className="form">
    <h1>Update your Job Offer</h1>
    <label>
        Title:
        <input type="text" value={ad.title || ""} onChange={handleChange} name="title" />
    </label><br></br>
    <label>
        Description:
        <textarea value={ad.description || ""} onChange={handleChange} name="description" />
    </label><br></br>
    <label>
        Location:
        <input type="text" value={ad.location || ""} onChange={handleChange} name="location" />
    </label><br></br>
    <label>
        Salary:
        <input type="text" value={ad.salary || ""} onChange={handleChange} name="salary" />
    </label><br></br>
    <label>
        Type of Contract:
        <input type="text" value={ad.contract_type || ""} onChange={handleChange} name="contract_type" />
    </label>
    <button onClick={handleClick} className='formButton'>Update</button>
</div>
<Footer></Footer>
</>
  )
};

export default Update