import Profile from "@/components/Main/Profile";
import PageTitle from "@/components/Ui/Title";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/Auth";

function ProfilePage() {
  const { authData } = useAuth();
  const [DesmosProfile, setDesmosProfile] = useState({
    dtag: "",
    nickname: "",
    bio: ""
  });
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    fetch(`https://api.mainnet.desmos.network/desmos/profiles/v3/profiles/${authData.walletSigner.signer.accountData.address}`)
      .then(response => response.json())
      .then(data => {
        setDesmosProfile({
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
                  <Profile dtag={DesmosProfile.dtag} nickname={DesmosProfile.nickname} bio={DesmosProfile.bio} wallet={authData.walletSigner.signer.accountData.address}/>
              </div>
          ) : (
              <div>
                  <PageTitle title="Create your profile" />
                  <Profile dtag="" nickname="" bio="" />
              </div>
          )}
      </div>
  );
}

export default ProfilePage;
