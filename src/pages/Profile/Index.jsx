import { useQuery } from "@tanstack/react-query";
import Profile from "@/components/Main/Profile";
import PageTitle from "@/components/Ui/Title";
import { AuthContext } from "@/context/Auth";
import React, { useContext } from "react";
import Error from "@/components/Ui/Error";

function ProfilePage() {
  const { authData } = useContext(AuthContext);

  const { data: desmosProfile, isLoading, isError } = useQuery({
    queryKey: ["desmosProfile"],
    queryFn: async () => {
      const response = await fetch(`https://api.mainnet.desmos.network/desmos/profiles/v3/profiles/${authData.walletSigner.signer.accountData.address}`)
        .then(res => (res.json()).then(res => (res.profile)));

      return response;
    }
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <Error message="Error fetching profile data." />;
  return (
      <div>
          <PageTitle title="Modify your profile" />
          <Profile dtag={desmosProfile.dtag} nickname={desmosProfile.nickname} bio={desmosProfile.bio} wallet={authData.walletSigner.signer.accountData.address}/>
      </div>
  );
}

export default ProfilePage;
