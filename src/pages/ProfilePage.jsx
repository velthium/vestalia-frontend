import DesmosProfileCreator from "../components/Desmos/ProfileCreator.jsx";
import PageTitle from "../components/Design/PageTitle.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import React, { useEffect, useState }  from "react"

function ProfilePage() {
    const { isConnected, setIsConnected, WalletSigner, setWalletSigner } = useAuth();
    const [profileInfo, setProfileInfo] = useState({});
    const [dataLoaded, setDataLoaded] = useState(false);

    
  useEffect(() => {
    console.log("Updated WalletSignerLOL:", WalletSigner.accountData.address);
  }, [WalletSigner]);


    useEffect(() => {
        console.log({ WalletSigner })
        fetch(`https://api.mainnet.desmos.network/desmos/profiles/v3/profiles/${WalletSigner.accountData.address}`)
            .then(response => response.json())
            .then(data => {
                setProfileInfo({
                    dtag: data.profile.dtag,
                    nickname: data.profile.nickname,
                    bio: data.profile.bio
                });
                setDataLoaded(true)
            })
            .catch(error => console.error(error));
    }, []);

    return(
        <div>
            {dataLoaded ? (
                <div>
                    <PageTitle title="Modify your profile" />
                    <DesmosProfileCreator dtag={profileInfo.dtag} nickname={profileInfo.nickname} bio={profileInfo.bio} />
                </div>
            ): (
                <div>
                    <PageTitle title="Create your profile" />
                    <DesmosProfileCreator dtag="" nickname="" bio="" />
                </div>
            )}
        </div>
    );
}

export default ProfilePage;