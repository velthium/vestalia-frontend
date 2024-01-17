import PageTitle from "../components/Design/PageTitle.jsx";
import Keplr from "../components/Wallet/Keplr.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

function KeplrPage() {

  const { isConnected, setIsConnected, walletAddress, setWalletAddress } = useAuth();
  const navigate = useNavigate();

  const handleClickPreviousPage = () => {
    navigate("/auth");
};

async function handleClickKeplr() {
  try {
    await Keplr();

    setIsConnected(true);

    setWalletAddress(Keplr.signer);

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