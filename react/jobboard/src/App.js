import { BrowserRouter, Routes, Route } from "react-router-dom";
import Acceuil from "./pages/Acceuil";
import Update from "./pages/Update";
import AdCard from './Adcard';
import Login from "./pages/Login";
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"



function App() {
  // Example ad data (Can be used in Acceuil or any other page if needed)
  const adData = {
    title: 'Frontend Developer Position',
    shortDescription: 'Looking for a frontend developer with React experience.',
    fullDescription: 'This is a full-time position for a frontend developer to join our growing team.',
    wages: '$30/hour',
    place: 'Remote',
    workingTime: '9 AM - 5 PM',
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Define your routes */}
          <Route path="/" element={<Acceuil />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path = "/Login" element={<Login/>}></Route>
          <Route path = "/Register" element={<Register/>}></Route>
          <Route path = "/Dashboard" element={<Dashboard/>}></Route>
          
          {/* Example usage of AdCard component directly in a route */}
          <Route path="/ad" element={
            <div style={{ padding: '20px' }}>
              <AdCard
                title={adData.title}
                shortDescription={adData.shortDescription}
                fullDescription={adData.fullDescription}
                wages={adData.wages}
                place={adData.place}
                workingTime={adData.workingTime}
              />
            </div>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;