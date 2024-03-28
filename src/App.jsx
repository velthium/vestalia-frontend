import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateCommunity from "@/pages/Community/Create";
import Header from "@/components/Design/Header";
import Footer from "@/components/Design/Footer";
import { AuthProvider } from "@/context/Auth";
import CreatePost from "@/pages/Post/Create";
import Community from "@/pages/Community/index";
import ReadPost from "@/pages/Post/index";
import EditPost from "@/pages/Post/Edit";
import MyPosts from "@/pages/Post/Personnal";
import Profile from "@/pages/Profile/index";
import Keplr from "@/pages/Auth/Keplr";
import Home from "@/pages/Home/index";
import Auth from "@/pages/Auth/index";
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
