import PageTitle from "@/components/Design/PageTitle";
import Keplr from "@/components/Wallet/Keplr"
import { useNavigate } from "react-router-dom";
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
            <button type="button" className="btn btn-primary w-75 m-auto" onClick={handleClickKeplr}>Connect your Keplr Wallet </button>
            <button type="button" className="btn btn-primary w-25 m-auto" onClick={handleClickPreviousPage}>Back </button>
          </div>
    </div>
  );
  }

  export default KeplrPage;