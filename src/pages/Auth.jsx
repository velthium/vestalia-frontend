import PageTitle from "@/components/Design/PageTitle";
import KeplrLogo from "@/assets/images/Keplr.svg"
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
            <button type="button" className="btn bg-white border shadow-sm w-25 mx-auto my-5 d-flex" onClick={handleClick}>
                <img src={KeplrLogo} alt="" />
                <p className="fw-semibold fs-4 my-auto ms-3">Keplr</p>
            </button>
    </div>
);
}

export default AuthPage;