import Keplr from "@/components/Main/Wallet/Keplr";
import KeplrLogo from "@/assets/images/Keplr.svg";
import ErrorAlert from "@/components/Alert/Error";
import PageTitle from "@/components/Ui/Title";
import { json, useNavigate } from "react-router-dom";
import React, { useState } from "react";

function KeplrPage() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleClickPreviousPage = () => {
    navigate("/auth");
  };

  async function handleClickKeplr() {
    try {
      const keplrData = await Keplr();

      sessionStorage.setItem("walletSigner", JSON.stringify(keplrData));

      try {
        const response = await fetch(`https://api.mainnet.desmos.network/desmos/profiles/v3/profiles/${keplrData.signer.accountData.address}`);

        if (response.ok) {
          const data = await response.json();

          const DesmosProfile = {
            dtag: data.profile.dtag,
            nickname: data.profile.nickname,
            bio: data.profile.bio
          };
          window.dispatchEvent(new Event("storage"));

          sessionStorage.setItem("desmosProfile", JSON.stringify(DesmosProfile));
          navigate("/");
        } else {
          navigate("/profile");
        }
      } catch (error) {
        navigate("/profile");
      }
    } catch (error) {
      setError(error);
    }
  }

  return (
    <div className="container">
        <PageTitle title="Keplr Wallet" />
        <div className="d-grid gap-5">
          <button type="button" className="btn bg-light-green w-25 rounded-5 mx-auto my-5 p-4" onClick={handleClickKeplr}>
            <img className="m-3" src={KeplrLogo} alt="" height="122" width="163" />
            <p className="m-auto w-75 bg-purple text-dark rounded h6 py-2">Connect</p>
          </button>
          <a className="d-flex w-25 text-start text-decoration-none text-dark" href="" onClick={handleClickPreviousPage}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi my-auto bi-caret-left-fill" viewBox="0 0 16 16">
              <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
            </svg>
            <p className="my-auto">Back</p>
          </a>
        </div>
        {error && <ErrorAlert error={error} />}
  </div>
  );
}

export default KeplrPage;
