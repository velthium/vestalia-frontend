import PageTitle from "../components/Design/PageTitle.jsx";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AuthPage() {
    const [pagination, setPagination] = useState({});
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    const handleClick = () => {
            navigate("/auth/keplr");
    };

    return (
        <div className="container">
            <PageTitle title="Connect your Wallet" />
            <button  type="button" className="btn btn-primary w-50 m-auto" onClick={handleClick}>Keplr </button>
    </div>
);
}

export default AuthPage;