import DesmosProfile from "../components/Desmos/Profile.jsx";
import PageTitle from "../components/Design/PageTitle.jsx";
import React, { useEffect, useState }  from "react"
import { useNavigate } from "react-router-dom";

function ProfilePage() {
    const navigate = useNavigate();
    const [profileInfo, setProfileInfo] = useState({
        dtag: '',
        nickname: '',
        bio: ''
      });
    const [dataLoaded, setDataLoaded] = useState(false);

    const signerData = JSON.parse(sessionStorage.getItem('signerData'));

    useEffect(() => {
        fetch(`https://api.mainnet.desmos.network/desmos/profiles/v3/profiles/${signerData.accountData.address}`)
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
                    <DesmosProfile dtag={profileInfo.dtag} nickname={profileInfo.nickname} bio={profileInfo.bio} />
                </div>
            ): (
                <div>
                    <PageTitle title="Create your profile" />
                    <DesmosProfile dtag="" nickname="" bio="" />
                </div>
            )}
        </div>
    );
}

export default ProfilePage;