import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateCommunity from "@/pages/CreateCommunity";
import Header from "@/components/Design/Header";
import Footer from "@/components/Design/Footer";
import { AuthProvider } from "@/context/Auth";
import CreatePost from "@/pages/CreatePost";
import Community from "@/pages/Community";
import ReadPost from "@/pages/ReadPost";
import EditPost from "@/pages/EditPost";
import MyPosts from "@/pages/MyPosts";
import Profile from "@/pages/Profile";
import Keplr from "@/pages/Keplr";
import Home from "@/pages/Home";
import Auth from "@/pages/Auth";
import React from "react";
import "@/App.css";

function App() {
  return (
      <BrowserRouter>
          <AuthProvider>
              <Header />
                <main className="App container mb-5 p-0 p-lg-1">
                  <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/auth" element={<Auth />} />
                      <Route path="/auth/keplr" element={<Keplr />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/edit-post/:postid" element={<EditPost />} />
                      <Route path="/user/:address/posts" element={<MyPosts />} />
                      <Route path="/create-community" element={<CreateCommunity />} />
                      <Route path="/community/:communityid/:communityname" element={<Community />} />
                      <Route path="/community/:communityid/:communityname/:postid" element={<ReadPost />} />
                      <Route path="/community/:communityid/:communityname/create-post" element={<CreatePost />} />
                  </Routes>
                </main>
              <Footer />
          </AuthProvider>
      </BrowserRouter>
  );
}

export default App;
