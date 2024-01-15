import PageTitle from "../components/Design/PageTitle.jsx";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function KeplrPage() {
  const [pagination, setPagination] = useState({});
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/auth");
};

  return (
    <div className="container">
        <PageTitle title="Keplr Wallet" />
        <button>Connect your Keplr Wallet </button>
        <button onClick={handleClick}>Back </button>
  </div>
);
}

export default KeplrPage;