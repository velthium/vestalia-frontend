import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfilPage from './pages/ProfilPage.jsx'
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from './pages/HomePage.jsx'
import './App.css';

function App() {
  return(
    <BrowserRouter>
      <Header />
      <div className="App container">
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profil" element={<ProfilPage />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  )
}

export default App;
