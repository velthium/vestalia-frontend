import DesmosProfile from "@/components/Desmos/Profile";
import PageTitle from "@/components/Design/PageTitle";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/Auth";

function ProfilePage() {
    const { authData } = useAuth();
    const [profileInfo, setProfileInfo] = useState({
        dtag: "",
        nickname: "",
        bio: ""
      });
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        fetch(`https://api.mainnet.desmos.network/desmos/profiles/v3/profiles/${authData.walletSigner.signer.accountData.address}`)
            .then(response => response.json())
            .then(data => {
                setProfileInfo({
                    dtag: data.profile.dtag,
                    nickname: data.profile.nickname,
                    bio: data.profile.bio
                });
                setDataLoaded(true);
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            {dataLoaded ? (
                <div>
                    <PageTitle title="Modify your profile" />
                    <DesmosProfile dtag={profileInfo.dtag} nickname={profileInfo.nickname} bio={profileInfo.bio} wallet={authData.walletSigner.signer.accountData.address}/>
                </div>
            ) : (
                <div>
                    <PageTitle title="Create your profile" />
                    <DesmosProfile dtag="" nickname="" bio="" />
                </div>
            )}
        </div>
    );
}

export default ProfilePage;
