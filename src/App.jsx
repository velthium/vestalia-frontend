import Header from './Header.jsx'
import Footer from './Footer.jsx'
import HomePage from './pages/HomePage.jsx'
import ProfilPage from './pages/ProfilPage.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

function App() {
  return(
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profil" element={<ProfilPage />} />
        </Routes>
        <h1>Welcome to Vestalia!</h1>
        <HomePage />
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App;
