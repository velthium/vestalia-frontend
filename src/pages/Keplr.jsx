import PageTitle from "@/components/Design/PageTitle";
import KeplrLogo from "@/assets/images/Keplr.svg"
import { useNavigate } from "react-router-dom";
import Keplr from "@/components/Wallet/Keplr"
import { useAuth } from "@/context/Auth"
import React from 'react';

  function KeplrPage() {
    const { authData } = useAuth();
    const navigate = useNavigate();

    const handleClickPreviousPage = () => {
      navigate("/auth");
  };

  async function handleClickKeplr() {
    try {
        const keplrData = await Keplr();

        sessionStorage.setItem('walletSigner', JSON.stringify(keplrData));
        sessionStorage.setItem('isConnected', 'true');
        window.dispatchEvent( new Event('storage') )

        try {
          const response = await fetch(`https://api.mainnet.desmos.network/desmos/profiles/v3/profiles/${keplrData.signer.accountData.address}`);

          if (response.ok) {
            const data = await response.json();

            const ProfileInfo = {
              dtag: data.profile.dtag,
              nickname: data.profile.nickname,
              bio: data.profile.bio
            };

            sessionStorage.setItem('profileInfo', JSON.stringify(ProfileInfo));
            navigate("/");
          }
          else {
            navigate("/profile");
          }
        }
        catch(error) {
          navigate("/profile");
        }
    }
    catch(error) {
      console.error("Error connecting Keplr wallet:", error.message);
    }
  }

    return (
      <div className="container">
          <PageTitle title="Keplr Wallet" />
          <div className="d-grid gap-5">
            <button type="button" className="btn bg-sand custom-btn w-25 m-auto p-4" onClick={handleClickKeplr}>
              <img className="m-3" src={KeplrLogo} alt="" height="122" width="163" />
              <p className="m-auto w-75 bg-purple text-dark rounded py-2">Connect</p>
            </button>
            <a className="d-flex w-25 text-start text-decoration-none text-dark" href="" onClick={handleClickPreviousPage}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi my-auto bi-caret-left-fill" viewBox="0 0 16 16">
                <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
              </svg>
              <p className="my-auto">Back</p>
            </a>
          </div>
    </div>
  );
  }

  export default KeplrPage;