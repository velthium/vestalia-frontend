import PageTitle from "@/components/Design/PageTitle";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

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