import PageTitle from "@/components/Design/PageTitle";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import KeplrLogo from "@/assets/images/Keplr.svg"

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
            <button type="button" className="btn bg-sand border shadow-sm w-25 m-auto d-flex" onClick={handleClick}>
                <img src={KeplrLogo} alt="" />
                <p className="fw-semibold fs-4 my-auto ms-3">Keplr</p>
            </button>
    </div>
);
}

export default AuthPage;