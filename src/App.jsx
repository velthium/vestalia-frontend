import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateCommunity from "@/pages/Community/Create";
import Community from "@/pages/Community/Index";
import { AuthProvider } from "@/context/Auth";
import NotFound from "@/pages/Error/NotFound";
import MyPosts from "@/pages/Post/Personal";
import CreatePost from "@/pages/Post/Create";
import Profile from "@/pages/Profile/Index";
import Header from "@/components/Ui/Header";
import Footer from "@/components/Ui/Footer";
import ReadPost from "@/pages/Post/Index";
import EditPost from "@/pages/Post/Edit";
import Keplr from "@/pages/Auth/Keplr";
import Home from "@/pages/Home/Index";
import Auth from "@/pages/Auth/Index";
import React from "react";
import "@/App.css";

function App() {
  const client = new QueryClient({});
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
            <AuthProvider>
                <Header />
                  <main className="App container mb-5 p-0 p-lg-1">
                    <Routes>
                        <Route path="/community/:communityid/:communityname/create-post" element={<CreatePost />} />
                        <Route path="/community/:communityid/:communityname/:postid" element={<ReadPost />} />
                        <Route path="/community/:communityid/:communityname" element={<Community />} />
                        <Route path="/create-community" element={<CreateCommunity />} />
                        <Route path="/user/:address/posts" element={<MyPosts />} />
                        <Route path="/edit-post/:postid" element={<EditPost />} />
                        <Route path="/auth/keplr" element={<Keplr />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/auth" element={<Auth />} />
                        <Route path='*' element={<NotFound />}/>
                        <Route path="/" element={<Home />} />
                    </Routes>
                  </main>
                <Footer />
            </AuthProvider>
        </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
