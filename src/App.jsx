import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext.jsx'
import CreatePost from './pages/CreatePost.jsx'
import Header from "./components/Design/Header.jsx";
import Footer from "./components/Design/Footer.jsx";
import Profile from './pages/Profile.jsx'
import Keplr from './pages/Keplr.jsx'
import Home from './pages/Home.jsx'
import Auth from './pages/Auth.jsx'
import EditPost from './pages/EditPost.jsx'
import MyPosts from './pages/MyPosts.jsx'
import './App.css';

function App() {
  return(
      <BrowserRouter>
          <AuthProvider>
              <Header />
                <div className="App container">
                  <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/auth" element={<Auth />} />
                      <Route path="/auth/keplr" element={<Keplr />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/create-post" element={<CreatePost />} />
                      <Route path="/user/:address/posts" element={<MyPosts />} />
                      <Route path="/edit-post/:postid" element={<EditPost />} />
                  </Routes>
                </div>
              <Footer />
          </AuthProvider>
      </BrowserRouter>
  )
}

export default App;
