import SuccessAlert from "@/components/Alert/Success";
import ErrorAlert from "@/components/Alert/Error";
import React, { useState } from "react";

function Dislike(props) {
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    return (
        <div className="">
        <button className="d-flex p-0 btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="align-self-center bi bi-caret-down-square" viewBox="0 0 16 16">
                <path d="M3.626 6.832A.5.5 0 0 1 4 6h8a.5.5 0 0 1 .374.832l-4 4.5a.5.5 0 0 1-.748 0z"/>
                <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"/>
            </svg>
            <p className="mx-2 mb-0">0</p>
        </button>

        {success && <SuccessAlert success={success} />}
        {error && <ErrorAlert error={error} />}
      </div>
    );
}

export default Dislike;
