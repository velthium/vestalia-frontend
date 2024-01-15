import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreatePostPage from './pages/CreatePostPage.jsx'
import Header from "./components/Design/Header.jsx";
import Footer from "./components/Design/Footer.jsx";
import ProfilePage from './pages/ProfilePage.jsx'
import HomePage from './pages/HomePage.jsx'
import './App.css';

function App() {
  return(
    <BrowserRouter>
      <Header />
      <div className="App container">
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/create-post" element={<CreatePostPage />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  )
}

export default App;
