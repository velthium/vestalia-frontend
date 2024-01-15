import DesmosProfileCreator from "../components/Desmos/ProfileCreator.jsx";
import PageTitle from "../components/Design/PageTitle.jsx";
import React, { useEffect, useState }  from "react"

function ProfilePage() {
    const [profileInfo, setProfileInfo] = useState({});
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        fetch('https://api.mainnet.desmos.network/desmos/profiles/v3/profiles/desmos1htyqkum6esle9zx7f4e3cfrmzwmyhn4p75pw6c')
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
            <PageTitle title="Profil page" />
            {dataLoaded ? (
                <DesmosProfileCreator dtag={profileInfo.dtag} nickname={profileInfo.nickname} bio={profileInfo.bio} />
            ): (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default ProfilePage;