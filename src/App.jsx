import { AuthProvider } from "./context/AuthContext.jsx"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreatePostPage from './pages/CreatePostPage.jsx'
import Header from "./components/Design/Header.jsx";
import Footer from "./components/Design/Footer.jsx";
import ProfilePage from './pages/ProfilePage.jsx'
import KeplrPage from './pages/KeplrPage.jsx'
import HomePage from './pages/HomePage.jsx'
import AuthPage from './pages/AuthPage.jsx'
import './App.css';

function App() {
  return(
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <div className="App container">
          <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/auth/keplr" element={<KeplrPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/create-post" element={<CreatePostPage />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;
